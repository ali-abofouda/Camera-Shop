import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, MessageCircle, Mail } from 'lucide-react';

export default function Contact() {
  const whatsappNumber = '201012345678';
  const whatsappMessage = encodeURIComponent('مرحبًا، أود الاستفسار عن خدمات كاميرات المراقبة.');

  return (
    <section className="pt-32 pb-20 px-6 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">تواصل معنا</h1>
          <p className="section-subtitle">
            نحن هنا لمساعدتك. تواصل معنا بأي طريقة تناسبك
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Quick Contact Cards */}
            <div className="card-premium p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                معلومات التواصل
              </h2>

              <div className="space-y-5">
                <ContactItem
                  icon={Phone}
                  label="الهاتف"
                  value="+20 10 1234 5678"
                  href="tel:+201012345678"
                  dir="ltr"
                />
                <ContactItem
                  icon={MessageCircle}
                  label="واتساب"
                  value="+20 10 1234 5678"
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  dir="ltr"
                  highlight
                />
                <ContactItem
                  icon={Mail}
                  label="البريد الإلكتروني"
                  value="info@eye-security.com"
                  href="mailto:info@eye-security.com"
                />
                <ContactItem
                  icon={MapPin}
                  label="العنوان"
                  value="شارع عصام عيسى، قرية الراهبين، مركز سمنود، محافظة الغربية"
                />
                <ContactItem
                  icon={Clock}
                  label="ساعات العمل"
                  value="السبت - الخميس: ٩ص - ٩م"
                />
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500"
              style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>تواصل عبر واتساب</span>
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="card-premium p-2 h-full min-h-[400px]">
              <div className="w-full h-full rounded-xl overflow-hidden">
                <iframe
                  title="موقعنا"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27234.77658033!2d31.2425!3d30.9567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c9d1e8f32c4d%3A0x1234567890abcdef!2z2KfZhNix2KfZh9io2YrZhtiMINiz2YXZhtmI2K8!5e0!3m2!1sar!2seg"
                  className="w-full h-full min-h-[380px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, label, value, href, dir, highlight }) {
  const content = (
    <div className={`flex items-start gap-4 p-3 rounded-xl transition-all duration-300 ${
      href ? 'hover:bg-surface-light cursor-pointer' : ''
    } ${highlight ? 'bg-green-500/10 border border-green-500/20' : ''}`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        highlight ? 'bg-green-500/20' : 'bg-surface-light'
      }`}>
        <Icon className={`w-5 h-5 ${highlight ? 'text-green-400' : 'text-accent'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-muted text-sm mb-0.5">{label}</p>
        <p className={`font-medium ${highlight ? 'text-green-400' : 'text-white'}`} dir={dir}>
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
