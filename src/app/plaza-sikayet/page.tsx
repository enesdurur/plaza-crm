"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function PlazaSikayetForm() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "sikayetler"), {
        ...form,
        createdAt: Timestamp.now(),
        status: "Yeni",
      });
      alert("Şikayet başarıyla gönderildi.");
      setForm({ title: "", category: "", description: "" });
    } catch (error) {
      alert("Hata oluştu.");
      console.error("Firestore hata:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Plaza Şikayet Formu</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="title"
          placeholder="Şikayet Başlığı"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="category"
          placeholder="Kategori (Temizlik, Güvenlik...)"
          value={form.category}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Detaylı açıklama..."
          value={form.description}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full">Şikayeti Gönder</Button>
      </form>
    </div>
  );
}
