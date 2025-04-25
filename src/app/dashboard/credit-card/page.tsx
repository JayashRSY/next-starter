"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const platforms = [
  "Amazon",
  "Flipkart",
  "Myntra",
  "Ajio",
  "Tata Cliq",
  "Nykaa",
  "Meesho",
  "Zomato",
  "Swiggy",
  "Dineout",
  "EazyDiner",
  "Offline Restaurant",
  "Offline Merchant (POS)",
  "Grocery Store",
  "Kirana Store",
  "Petrol Pump",
  "Utility Bill Payment",
  "UPI",
  "Paytm",
  "PhonePe",
  "Google Pay",
  "Amazon Pay",
  "Credit Card Bill Payment",
  "IRCTC",
  "MakeMyTrip",
  "Yatra",
  "Goibibo",
  "Uber",
  "Ola",
  "RedBus",
  "Airlines (IndiGo, Air India, etc.)",
  "Netflix",
  "Prime Video",
  "Hotstar",
  "BookMyShow",
  "Spotify",
  "YouTube Premium",
  "PharmEasy",
  "1mg",
  "Practo",
  "Apollo",
  "Offline Pharmacy",
  "Gym Membership",
  "Other",
];

const categories = [
  "Groceries",
  "Electronics",
  "Food & Dining",
  "Travel & Transport",
  "Fashion & Apparel",
  "Fuel",
  "Utilities & Bills",
  "Health & Wellness",
  "Entertainment & Subscriptions",
  "Education",
  "Rent & Housing",
  "EMI/Loan Payments",
  "Miscellaneous / Others",
];

const userCards = [
  "HDFC Millennia",
  "Axis Magnus",
  "ICICI Amazon Pay",
  "SBI Cashback",
  "Amex MRCC",
  "Standard Chartered Ultimate",
  "HSBC Cashback",
  "IDFC First Wealth",
  "Other Card",
];

export default function CreditCardRecommender() {
  const [amount, setAmount] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedCards, setSelectedCards] = useState<any>([]);
  const [compareAll, setCompareAll] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recommendation, setRecommendation] = useState<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCardToggle = (card: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelectedCards((prev: any) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prev.includes(card) ? prev.filter((c:any) => c !== card) : [...prev, card]
    );
  };

  const validate = () => {
    if (!amount || !platform || !category || selectedCards.length === 0) {
      toast.error("Please fill all fields and select your cards.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          platform,
          category,
          selectedCards,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRecommendation(data);
      } else {
        toast.error(data.error || "Recommendation failed.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Something went wrong while fetching recommendation.", err);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Credit Card Recommender</h1>

      <Card>
        <CardHeader>
          <CardTitle>Enter Your Spend Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="number"
            placeholder="Enter amount in ₹"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Select onValueChange={setPlatform}>
            <SelectTrigger>
              <SelectValue placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent>
              {platforms.map((plat) => (
                <SelectItem key={plat} value={plat}>
                  {plat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div>
            <p className="font-medium mb-2">Select Your Credit Cards</p>
            <div className="grid grid-cols-2 gap-2">
              {userCards.map((card) => (
                <label key={card} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedCards.includes(card)}
                    onCheckedChange={() => handleCardToggle(card)}
                  />
                  {card}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch checked={compareAll} onCheckedChange={setCompareAll} />
            <span>Compare All Cards</span>
          </div>

          <Button onClick={handleSubmit}>Get Recommendation</Button>
        </CardContent>
      </Card>

      {recommendation && !compareAll && (
        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle>Recommended Card</CardTitle>
          </CardHeader>
          <CardContent>
            Use <strong>{recommendation.card}</strong> to save{" "}
            <strong>{recommendation.savings}</strong>
          </CardContent>
        </Card>
      )}

      {compareAll && (
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle>Compare All Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              (Coming soon... will show projected savings for each card.)
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
