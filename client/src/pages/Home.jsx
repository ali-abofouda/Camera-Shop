import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Wrench, Shield, ChevronLeft, Zap, Clock, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9InJnYmEoNTksMTMwLDI0NiwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-40" />
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-accent-cyber/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm mb-8">
                <Shield className="w-4 h-4" />
                <span>الأمان يبدأ من هنا</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">جاد للمراقبة</span>
                <br />
                <span className="text-white">كاميرات وأنظمة أمنية</span>
              </h1>

              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
                نوفر لك أحدث أنظمة المراقبة والكاميرات الأمنية بأعلى جودة وأسعار منافسة.
                خدمة احترافية في الغربية وجميع أنحاء مصر.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products" className="btn-primary inline-flex items-center justify-center gap-2">
                  <span>تصفح المنتجات</span>
                  <ChevronLeft className="w-5 h-5" />
                </Link>
                <Link to="/contact" className="btn-secondary inline-flex items-center justify-center gap-2">
                  <span>تواصل معنا</span>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 mt-20 max-w-2xl mx-auto"
            >
              {[
                { value: '+500', label: 'عميل سعيد' },
                { value: '+1000', label: 'كاميرا مُركبة' },
                { value: '24/7', label: 'دعم فني' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold gradient-text-accent">{stat.value}</div>
                  <div className="text-muted text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">خدماتنا</h2>
            <p className="section-subtitle">
              نقدم حلول أمنية متكاملة تناسب احتياجاتك
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <ServiceCard
              icon={Camera}
              title="تركيب الكاميرات"
              description="فريق فني محترف لتركيب جميع أنواع كاميرات المراقبة في المنازل والمنشآت التجارية والصناعية."
              features={['كاميرات داخلية وخارجية', 'أنظمة DVR و NVR', 'رؤية ليلية متطورة']}
              index={0}
            />
            <ServiceCard
              icon={Wrench}
              title="الصيانة والدعم الفني"
              description="دعم فني متواصل وخدمات صيانة دورية لضمان عمل الكاميرات بكفاءة على مدار الساعة."
              features={['صيانة دورية', 'دعم فني 24/7', 'قطع غيار أصلية']}
              index={1}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">لماذا تختارنا؟</h2>
            <p className="section-subtitle">
              خبرة طويلة في مجال أنظمة المراقبة والحماية
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: 'تركيب سريع', desc: 'تركيب احترافي في أقل وقت ممكن' },
              { icon: Clock, title: 'دعم متواصل', desc: 'فريق دعم فني متاح على مدار الساعة' },
              { icon: Award, title: 'ضمان شامل', desc: 'ضمان على جميع المنتجات والخدمات' },
              { icon: Shield, title: 'أمان تام', desc: 'أنظمة تشفير متقدمة لحماية بياناتك' },
              { icon: Camera, title: 'أحدث التقنيات', desc: 'كاميرات 4K و AI للكشف الذكي' },
              { icon: Wrench, title: 'صيانة مجانية', desc: 'صيانة مجانية خلال فترة الضمان' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-subtle p-6 text-center group hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-4xl"
        >
          <div className="card-premium p-10 md:p-16 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent-cyber/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                جاهز لتأمين منشأتك؟
              </h2>
              <p className="text-muted mb-8 max-w-xl mx-auto">
                تواصل معنا الآن واحصل على استشارة مجانية لتحديد أفضل نظام مراقبة يناسب احتياجاتك
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                <span>تواصل معنا الآن</span>
                <ChevronLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, description, features, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="card-premium p-8 group"
    >
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-cyber flex items-center justify-center shadow-glow">
            <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-muted leading-relaxed mb-4">
            {description}
          </p>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
