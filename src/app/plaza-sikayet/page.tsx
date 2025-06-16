"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PlazaSikayetForm() {
  const [form, setForm] = useState({
    plaza: "",
    customPlaza: "",
    category: "",
    customCategory: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedPlaza = form.plaza === "other" ? form.customPlaza : form.plaza;
    const selectedCategory = form.category === "other" ? form.customCategory : form.category;

    try {
      await addDoc(collection(db, "sikayetler"), {
        title: `${selectedPlaza} / ${selectedCategory}`,
        category: selectedCategory,
        plaza: selectedPlaza,
        description: form.description,
        createdAt: Timestamp.now(),
        status: "Yeni",
      });
      alert("Şikayet başarıyla gönderildi.");
      setForm({ plaza: "", customPlaza: "", category: "", customCategory: "", description: "" });
    } catch (error) {
      alert("Hata oluştu.");
      console.error("Firestore hata:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Plaza Şikayet Formu</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Plaza Seçiniz</Label>
          <Select onValueChange={(val) => setForm((f) => ({ ...f, plaza: val }))}>
            <SelectTrigger>
              <SelectValue placeholder="Plaza seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="link">Link</SelectItem>
              <SelectItem value="olive">Olive</SelectItem>
              <SelectItem value="dlp">DLP No.1</SelectItem>
              <SelectItem value="other">Diğer</SelectItem>
            </SelectContent>
          </Select>
          {form.plaza === "other" && (
            <Input
              name="customPlaza"
              placeholder="Plaza adı giriniz"
              value={form.customPlaza}
              onChange={handleChange}
              className="mt-2"
            />
          )}
        </div>

        <div>
          <Label>Şikayet Türü</Label>
          <Select onValueChange={(val) => setForm((f) => ({ ...f, category: val }))}>
            <SelectTrigger>
              <SelectValue placeholder="Şikayet türü seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="temizlik">Temizlik</SelectItem>
              <SelectItem value="guvenlik">Güvenlik</SelectItem>
              <SelectItem value="teknik">Teknik</SelectItem>
              <SelectItem value="yönetim">Yönetim</SelectItem>
              <SelectItem value="other">Diğer</SelectItem>
            </SelectContent>
          </Select>
          {form.category === "other" && (
            <Input
              name="customCategory"
              placeholder="Kategori giriniz"
              value={form.customCategory}
              onChange={handleChange}
              className="mt-2"
            />
          )}
        </div>

        <div>
          <Label>Şikayet / Açıklama</Label>
          <Textarea
            name="description"
            placeholder="Detaylı açıklama yazınız..."
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Şikayeti Gönder
        </Button>
      </form>
    </div>
  );
}
