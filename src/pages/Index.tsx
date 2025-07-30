import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Plus, Minus, ShoppingCart, Calendar } from "lucide-react";

// Mock data for the prototype
const mockCartItems = [
  {
    id: 1,
    restaurant: "Pizza Palace",
    restaurantId: "rest1",
    item: "Margherita Pizza",
    price: 12.99,
    quantity: 2,
    image: "🍕"
  },
  {
    id: 2,
    restaurant: "Burger Bistro", 
    restaurantId: "rest2",
    item: "Classic Cheeseburger",
    price: 8.99,
    quantity: 1,
    image: "🍔"
  },
  {
    id: 3,
    restaurant: "Pizza Palace",
    restaurantId: "rest1", 
    item: "Garlic Bread",
    price: 4.99,
    quantity: 3,
    image: "🥖"
  },
  {
    id: 4,
    restaurant: "Sushi Spot",
    restaurantId: "rest3",
    item: "California Roll",
    price: 9.99,
    quantity: 2,
    image: "🍣"
  }
];

const Index = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [scheduledTime, setScheduledTime] = useState("2024-01-15T18:00");

  const updateServes = (id: number, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const groupedItems = cartItems.reduce((groups, item) => {
    const restaurant = item.restaurant;
    if (!groups[restaurant]) {
      groups[restaurant] = [];
    }
    groups[restaurant].push(item);
    return groups;
  }, {} as Record<string, typeof cartItems>);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Swiggy Caterers</h1>
          <p className="text-muted-foreground">Order from multiple restaurants, delivered together</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Your Cart ({totalItems} items)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(groupedItems).map(([restaurant, items]) => (
                  <div key={restaurant} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{restaurant}</h3>
                      <Badge variant="secondary">
                        <MapPin className="h-3 w-3 mr-1" />
                        {items.length} item{items.length > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.image}</span>
                          <div>
                            <p className="font-medium">{item.item}</p>
                            <p className="text-sm text-muted-foreground">${item.price}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Serves:</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateServes(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateServes(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Cutlery:</span>
                            <span>{item.quantity} sets</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Separator />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Scheduling */}
          <div className="space-y-4">
            {/* Scheduled Delivery */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule Delivery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Time</label>
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Serving Executives</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="none">No serving executives needed</option>
                    <option value="1">1 serving executive</option>
                    <option value="2">2 serving executives</option>
                    <option value="3">3+ serving executives</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  All restaurants will coordinate for simultaneous delivery
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$3.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coordination Fee</span>
                    <span>$2.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${(totalAmount + 3.99 + 2.00).toFixed(2)}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  Place Multi-Restaurant Order
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  By placing this order, you agree that all restaurants will prepare food for the scheduled delivery time
                </p>
              </CardContent>
            </Card>

            {/* Features Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Coming Soon</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs space-y-1">
                  <p>• Save as favorite bulk order</p>
                  <p>• Weekly recurring orders</p>
                  <p>• Group ordering with friends</p>
                  <p>• Corporate catering mode</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
