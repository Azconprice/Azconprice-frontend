"use client"

import { Search, Filter, Edit2, Trash2, Plus } from "lucide-react";
import { useState } from "react";

const CompanyProducts = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products] = useState([
      { id: 1, name: "Taxta", description: "Yüksək keyfiyyətli təbii taxta materialı", unit: "m²", pricePerUnit: "5.00" },
      { id: 2, name: "Sement", description: "İnşaat üçün Portland sementi", unit: "çuval", pricePerUnit: "12.50" },
      { id: 3, name: "Kərpic", description: "Qırmızı tikinti kərpici", unit: "ədəd", pricePerUnit: "0.25" },
      { id: 4, name: "Dəmir", description: "İnşaat dəmiri A400", unit: "kg", pricePerUnit: "1.80" },
      { id: 5, name: "Qum", description: "İnşaat qumu təmizlənmiş", unit: "ton", pricePerUnit: "45.00" },
      { id: 6, name: "Çınqıl", description: "Orta ölçülü çınqıl materialı", unit: "ton", pricePerUnit: "35.00" },
      { id: 7, name: "Boya", description: "Divar üçün lateks boyası", unit: "litr", pricePerUnit: "8.75" },
      { id: 8, name: "Kafel", description: "Banyo üçün seramik kafel", unit: "m²", pricePerUnit: "22.00" },
      { id: 9, name: "Parket", description: "Laminat parket örtüyü", unit: "m²", pricePerUnit: "18.50" },
      { id: 10, name: "Şüşə", description: "Pəncərə üçün şüşə", unit: "m²", pricePerUnit: "15.30" },
      { id: 11, name: "Mis boru", description: "Su kəməri üçün mis boru", unit: "metr", pricePerUnit: "4.20" },
      { id: 12, name: "Elektrik kabeli", description: "Ev elektrik kabeli 2.5mm", unit: "metr", pricePerUnit: "2.50" },
    ]);
  
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="p-8 mt-20 h-[calc(100vh-80px)] bg-white flex flex-col">
        <div className="p-6">
          <div className="flex justify-between items-centerr mb-6">
            <button className=" text-[15px] cursor-pointer flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors">
              
              Məhsul əlavə edin
              <Plus size={20} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Axtar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-80 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter size={20} className="text-orange-600 w-[22px] h-[22px]  " />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 px-6 pb-6">
          <div className="h-full overflow-auto bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">ID</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Məhsulun adı</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Ətraflı təsvir</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Ölçü vahidi</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Qiymət / vahid</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr 
                    key={product.id} 
                    className={`border-b border-gray-50 hover:bg-gray-25 transition-colors ${
                      index % 2 === 0 ? 'bg-gray-25' : 'bg-white'
                    }`}
                  >
                    <td className="py-4 px-4 text-gray-600 font-medium">{product.id}</td>
                    <td className="py-4 px-4 text-gray-800 font-medium">{product.name}</td>
                    <td className="py-4 px-4 text-gray-600">{product.description}</td>
                    <td className="py-4 px-4 text-gray-600">{product.unit}</td>
                    <td className="py-4 px-4 text-gray-800 font-medium">{product.pricePerUnit} ₼</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  <Search size={48} className="mx-auto" />
                </div>
                <p className="text-gray-500">Heç bir məhsul tapılmadı</p>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CompanyProducts;