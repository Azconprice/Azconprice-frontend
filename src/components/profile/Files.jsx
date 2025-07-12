import Image from 'next/image';
import uploadCloud from '@/assets/icons/upload_cloud.svg';
import excelIcon from '@/assets/icons/excel.svg';
import checkMark from '@/assets/icons/checkmark.svg';
import { X } from 'lucide-react';

const Files = () => {
    return (
        <div className="p-[32px] mt-[80px] overflow-y-auto h-[calc(100vh-80px)]">
            <div className="flex flex-col md:flex-row gap-[18px]">
                <div className="lg:w-[400px] md:w-[350px] h-fit w-full bg-[#101827] p-[20px] rounded-[22px]">
                    <h3 className="text-white font-bold text-[16px] text-center mb-[20px]">Faylı göndərin</h3>
                    <div className="bg-white border-1 border-[#F37321] flex flex-col justify-center items-center p-[30px] rounded-[12px]">
                        <Image
                            src={uploadCloud}
                            alt='upload'
                        />
                        <p className='font-[500] text-[14px] text-[#868686] text-center'>
                            Faylınızı sürükləyin
                            və ya
                        </p>
                        <p className='font-[500] text-[14px] text-[#F37321] text-center'>
                            Faylları gözdən keçirin
                        </p>
                    </div>

                    <p className='my-[16px] text-white font-[500] text-[10px]'>
                        Dəstəklənən fayl tipi: .xls .xlsx
                    </p>

                    <div className='bg-white p-[10px] rounded-[8px] flex items-center justify-between mb-[18px]'>
                        <div className='flex items-center gap-[5px]'>
                            <Image
                                src={excelIcon}
                                width={16}
                                height={16}
                                alt='excel'
                            />
                            <p className='text-[8px] text-[#686868]'>
                                Nümunə faylını endirərək məhsullarınızı əlavə edin
                            </p>
                        </div>
                    </div>

                    <div className='mb-[20px]'>
                        <div className='flex justify-between items-center mb-[5px]'>
                            <div className='flex items-center gap-[10px]'>
                                <Image
                                    src={checkMark}
                                    width={14}
                                    height={14}
                                    alt='checkmark'
                                    className='shrink-0'
                                />
                                <span className='text-white text-[12px] font-[500]'>Excel_File.xls</span>
                                <span className='text-white text-[10px] font-[500] ml-[10px]'>(215 KB)</span>
                            </div>

                            <div className='flex items-center gap-[8px]'>
                                <span className='text-white text-[12px] font-[500] ml-[10px]'>1h ago</span>
                                <button className='cursor-pointer'>
                                    <X size={15} color='#ffffff' />
                                </button>
                            </div>
                        </div>
                        <div className='flex justify-between items-center mb-[5px]'>
                            <div className='flex items-center gap-[10px]'>
                                <Image
                                    src={checkMark}
                                    width={14}
                                    height={14}
                                    alt='checkmark'
                                    className='shrink-0'
                                />
                                <span className='text-white text-[12px] font-[500]'>Excel_File.xls</span>
                                <span className='text-white text-[10px] font-[500] ml-[10px]'>(215 KB)</span>
                            </div>

                            <div className='flex items-center gap-[8px]'>
                                <span className='text-white text-[12px] font-[500] ml-[10px]'>1h ago</span>
                                <button className='cursor-pointer'>
                                    <X size={15} color='#ffffff' />
                                </button>
                            </div>
                        </div>
                    </div>

                    <button className='w-[100px] py-[10px] bg-[#F37321] border-1 border-[#F37321] text-white rounded-full transition hover:opacity-90 text-[12px] font-[500] cursor-pointer'>
                        Göndər
                    </button>
                </div>

                <div className='flex-grow shadow-[0px_4px_4px_0px_#00000040] rounded-[20px] bg-[#F8FAFC]'>
                    <div className="bg-white rounded-[20px] overflow-hidden">
                        <div className="p-[20px]">
                            <h3 className="text-[#101827] font-bold text-[16px] mb-[20px]">Ən Son Fəaliyyətlər</h3>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-[#E5E7EB]">
                                            <th className="text-left py-[12px] px-[8px] text-[#6B7280] font-[500] text-[12px]">ID</th>
                                            <th className="text-left py-[12px] px-[8px] text-[#6B7280] font-[500] text-[12px]">Fayllar</th>
                                            <th className="text-left py-[12px] px-[8px] text-[#6B7280] font-[500] text-[12px]">Ölçüsü</th>
                                            <th className="text-left py-[12px] px-[8px] text-[#6B7280] font-[500] text-[12px]">Tarix</th>
                                            <th className="text-left py-[12px] px-[8px] text-[#6B7280] font-[500] text-[12px]"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...Array(11)].map((_, index) => (
                                            <tr key={index} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                                                <td className="py-[12px] px-[8px] text-[#374151] font-[500] text-[12px]">001</td>
                                                <td className="py-[12px] px-[8px] text-[#374151] font-[500] text-[12px]">Lahıya.xls</td>
                                                <td className="py-[12px] px-[8px] text-[#374151] font-[500] text-[12px]">216 Kb</td>
                                                <td className="py-[12px] px-[8px] text-[#374151] font-[500] text-[12px]">01.02.2024</td>
                                                
                                                <td className="py-[12px] px-[8px]">
                                                    <button className="text-[#374151] font-[500] text-[12px] hover:text-[#F37321] bg-[#F0EEEE] transition cursor-pointer rounded-full px-[12px] py-[4px]">
                                                        Yüklə
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Files