import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-accent/30 to-transparent">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          عين الحماية لكاميرات المراقبة
        </h1>
        <p className="max-w-xl text-lg text-muted mb-6">
          نوفر لك أحدث أنظمة المراقبة والكاميرات الأمنية بأعلى جودة وأسعار منافسة في مصر.
        </p>
        <Link
          to="/products"
          className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          تصفح المنتجات
        </Link>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="section-title text-center mb-10">خدماتنا</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <ServiceCard
            title="تركيب الكاميرات"
            description="فريق فني محترف لتركيب جميع أنواع كاميرات المراقبة في المنازل والمنشآت."
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4zM3 6h12a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2z"
              />
            }
          />
          <ServiceCard
            title="الصيانة والدعم الفني"
            description="دعم فني متواصل وخدمات صيانة دورية لضمان عمل الكاميرات بكفاءة."
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.725 1.725 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.725 1.725 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.725 1.725 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.725 1.725 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.725 1.725 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.725 1.725 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.725 1.725 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
            }
          />
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ title, description, icon }) {
  return (
    <div className="glass p-6 flex flex-col items-center text-center hover:scale-[1.02] transition">
      <div className="bg-accent rounded-full p-4 mb-4">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted text-sm">{description}</p>
    </div>
  );
}
