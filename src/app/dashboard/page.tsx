"use client";
type Complaint = {
  id: string;
  title: string;
  category: string;
  description: string;
  createdAt: {
    toDate: () => Date;
  };
  status: string;
};


import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Dashboard() {
  type Complaint = {
  id: string;
  title: string;
  category: string;
  description: string;
  createdAt: any;
  status: string;
};

const [complaints, setComplaints] = useState<Complaint[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "sikayetler"));
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComplaints(list);
      } catch (error) {
        console.error("Şikayetler çekilirken hata oluştu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Şikayet Listesi</h1>
      {complaints.length === 0 && (
        <p className="text-sm text-muted-foreground">Henüz şikayet kaydı yok.</p>
      )}
      {complaints.map((item) => (
        <Card key={item.id} className="rounded-xl shadow-sm">
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <Badge variant="outline">{item.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Kategori: {item.category}</p>
            <p className="text-sm">{item.description}</p>
            <p className="text-xs text-gray-500">
              Tarih: {item.createdAt?.toDate?.().toLocaleDateString?.() || "-"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
