"use client"

import { Search, Filter, Edit2, Trash2, Plus } from "lucide-react";
import { useState } from "react";

const CompanyProducts = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products] = useState([
      { id: 1, name: "Taxta", type: "Odun Materialı", size: "10 m^2", price: "5" },
      { id: 2, name: "Taxta", type: "Odun Materialı", size: "10 m^2", price: "5" },
      { id: 3, name: "Taxta", type: "Odun Materialı", size: "10 m^2", price: "5" },
      { id: 4, name: "Taxta", type: "Odun Materialı", size: "10 m^2", price: "5" },
      { id: 5, name: "Taxta", type: "Odun Materialı", size: "10 m^2", price: "5" },
      { id: 6, name: "Taxta", type: "Odun Materialı", size: "10 m^2", price: "5" },
      { id: 7, name: "Taxta", type: "Odun Materialı", size: "10 m^2", price: "5" },
      { id: 8, name: "Taxta", type: "Odun Materialı", size: "10 m^2", price: "5" },
      { id: 9, name: "Taxta", type: "Odun Materialı", size: "10 m^2", price: "5" },
      { id: 10, name: "Taxta", type: "Odun Materialı", size: "10 m^2", price: "5" },
      { id: 11, name: "Taxta", type: "Odun Materialı", size: "10 m^2", price: "5" },
      { id: 12, name: "Taxta", type: "Odun Materialı", size: "10 m^2", price: "5" },
    ]);
  
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="p-8 mt-20 overflow-y-auto h-[calc(100vh-80px)] bg-white">
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
  
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Məhsulun adı</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Tipi</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Ölçüsü</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Qiyməti</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Redaktə</th>
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
                    <td className="py-4 px-4 text-gray-800">{product.name}</td>
                    <td className="py-4 px-4 text-gray-600">{product.type}</td>
                    <td className="py-4 px-4 text-gray-600">{product.size}</td>
                    <td className="py-4 px-4 text-gray-800 font-medium">{product.price}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                          <Edit2 size={16} className="text-blue-600 group-hover:text-blue-700" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                          <Trash2 size={16} className="text-red-500 group-hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
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
    );
  };
  
  export default CompanyProducts;