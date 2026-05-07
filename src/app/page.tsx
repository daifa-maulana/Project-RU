import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Book, 
  Users, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Award,
  Calendar,
  MessageCircle,
  Zap,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      {/* Hero Section - Elite Design */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        
        {/* Animated Background Blobs */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-[100px]"></div>
        
        <div className="container relative mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-xl shadow-emerald-100/50 border border-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest animate-bounce">
              <Sparkles className="w-3 h-3 fill-emerald-500" />
              Penerimaan Santri Baru 2026/2027 Telah Dibuka
            </div>
            
            <h1 className="text-5xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Mencetak Generasi <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">Hafizh Qur'ani</span> Bersanad.
            </h1>
            
            <p className="text-lg lg:text-2xl text-slate-500 max-w-3xl font-medium leading-relaxed">
              Pesantren Raudhlatul Ulum memadukan kurikulum Tahfidz Intensif dengan pendidikan karakter berbasis adab, didukung oleh sistem monitoring real-time bagi orang tua.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 w-full sm:w-auto">
              <Link href="/login" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-slate-900 hover:bg-emerald-600 text-white font-black text-lg shadow-2xl shadow-emerald-200 transition-all hover:-translate-y-1 group">
                  Masuk Portal Sistem <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-2xl border-2 border-slate-100 font-bold text-slate-600 hover:bg-white hover:border-emerald-200 transition-all">
                Download Brosur PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="container mx-auto px-6 mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
           {[
             { label: 'Santri Aktif', value: '150+', icon: Users, color: 'text-blue-600' },
             { label: 'Hafizh Lulus', value: '45+', icon: Award, color: 'text-emerald-600' },
             { label: 'Asatidz Bersanad', value: '12', icon: ShieldCheck, color: 'text-amber-600' },
             { label: 'Tahun Berdiri', value: '2018', icon: Calendar, color: 'text-violet-600' },
           ].map((stat, i) => (
             <div key={i} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm flex flex-col items-center text-center space-y-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Program Section - Modern Cards */}
      <section className="py-32 bg-white relative">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
               <div className="max-w-2xl space-y-4">
                  <p className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">Kurikulum Unggulan</p>
                  <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">Metode Pembelajaran Terintegrasi & Terukur.</h2>
               </div>
               <p className="text-slate-500 font-medium max-w-sm">Kami berkomitmen memberikan pendidikan terbaik dengan standar kualitas yang terjaga dan transparan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { 
                   title: 'Tahfidz Bersanad', 
                   desc: 'Menghafal dengan bimbingan ustadz yang memiliki sanad hafalan bersambung hingga Rasulullah SAW.',
                   icon: Book,
                   color: 'bg-emerald-600'
                 },
                 { 
                   title: 'Pendidikan Adab', 
                   desc: 'Menjadikan adab sebagai pondasi utama sebelum ilmu, membentuk karakter santri yang rendah hati.',
                   icon: Heart,
                   color: 'bg-teal-600'
                 },
                 { 
                   title: 'Monitoring Digital', 
                   desc: 'Satu-satunya sistem yang memungkinkan orang tua melihat progres hafalan secara harian dan transparan.',
                   icon: Zap,
                   color: 'bg-blue-600'
                 }
               ].map((item, i) => (
                 <div key={i} className="group p-10 rounded-[3rem] bg-slate-50 border border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                    <div className={`w-16 h-16 ${item.color} rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-slate-200 group-hover:scale-110 transition-transform duration-500`}>
                       <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    <div className="mt-8 flex items-center text-slate-900 font-black text-xs gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       Selengkapnya <ArrowRight className="w-4 h-4" />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Feature Showcase - Mockup style */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 pointer-events-none"></div>
         <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
               <div className="lg:w-1/2 space-y-10 relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3" /> Teknologi untuk Pendidikan
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">Satu Portal untuk Seluruh Kebutuhan Wali Santri.</h2>
                  <div className="space-y-6">
                     {[
                       'Pantau Ziyadah & Muraja\'ah harian',
                       'Terima notifikasi absensi real-time',
                       'Catatan perkembangan langsung dari Ustadz',
                       'Rekapitulasi ijazah digital terintegrasi'
                     ].map((text, i) => (
                       <div key={i} className="flex items-center gap-4">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                             <CheckCircle2 className="w-4 h-4 text-slate-900" />
                          </div>
                          <span className="text-slate-300 font-bold">{text}</span>
                       </div>
                     ))}
                  </div>
                  <div className="pt-6">
                    <Link href="/login">
                      <Button className="h-16 px-10 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-lg transition-all shadow-xl shadow-emerald-500/20">
                        Coba Portal Sekarang
                      </Button>
                    </Link>
                  </div>
               </div>
               
               <div className="lg:w-1/2 relative">
                  {/* Decorative Frame for "Mockup" look */}
                  <div className="relative z-10 bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-[3rem] shadow-3xl border border-slate-700">
                     <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden aspect-[4/3] relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
                        <div className="p-8 space-y-6">
                           <div className="flex items-center justify-between">
                              <div className="w-24 h-4 bg-slate-700 rounded-full"></div>
                              <div className="w-10 h-10 bg-slate-800 rounded-xl"></div>
                           </div>
                           <div className="space-y-3">
                              <div className="w-full h-32 bg-slate-800/50 rounded-3xl border border-slate-700/50"></div>
                              <div className="grid grid-cols-2 gap-3">
                                 <div className="h-24 bg-slate-800/50 rounded-3xl"></div>
                                 <div className="h-24 bg-slate-800/50 rounded-3xl"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* Glowing light behind */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
               </div>
            </div>
         </div>
      </section>

      {/* Testimonials or Quotes */}
      <section className="py-32 bg-white">
         <div className="container mx-auto px-6 text-center">
            <MessageCircle className="w-16 h-16 text-emerald-100 mx-auto mb-10" />
            <blockquote className="max-w-4xl mx-auto">
               <p className="text-3xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-8">
                 "Raudhlatul Ulum bukan sekadar tempat menghafal, tapi tempat di mana akhlak anak saya benar-benar dibentuk dengan cinta dan disiplin."
               </p>
               <footer className="space-y-2">
                  <p className="text-lg font-black text-emerald-600 uppercase tracking-widest">— Wali Santri Raudhlatul Ulum</p>
                  <p className="text-slate-400 font-medium">Angkatan 2024</p>
               </footer>
            </blockquote>
         </div>
      </section>

      {/* Final CTA */}
      <section className="pb-32 bg-white">
         <div className="container mx-auto px-6">
            <div className="bg-emerald-600 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-3xl shadow-emerald-200">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
               <div className="relative z-10 space-y-10">
                  <h2 className="text-4xl lg:text-7xl font-black tracking-tight leading-none">Siap Bergabung dengan Keluarga Qur'ani Kami?</h2>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                     <Button className="h-16 px-12 rounded-2xl bg-white text-emerald-900 hover:bg-slate-100 font-black text-lg transition-all shadow-xl">
                       Daftar Online Sekarang
                     </Button>
                     <Button variant="outline" className="h-16 px-12 rounded-2xl border-2 border-white/20 text-white hover:bg-white/10 font-black text-lg">
                       Konsultasi via WhatsApp
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
