export default function Contact() {
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <h1 className="section-title text-center mb-10">تواصل معنا</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="glass p-6">
          <h2 className="text-xl font-semibold mb-4">معلومات التواصل</h2>
          <ul className="space-y-4 text-muted">
            <li className="flex gap-3 items-start">
              <svg
                className="w-6 h-6 text-accent flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span dir="ltr">+20 10 1234 5678</span>
            </li>
            <li className="flex gap-3 items-start">
              <svg
                className="w-6 h-6 text-accent flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>١٢٣ شارع التحرير، القاهرة، مصر</span>
            </li>
          </ul>
        </div>
        <div className="glass overflow-hidden h-64 md:h-auto">
          {/* Embed Google Map - Replace src with your actual location embed */}
          <iframe
            title="موقعنا"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.748068086426!2d31.235712215114997!3d30.04441998188226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c5736afc13%3A0x2c5bda3b5e3fa5c7!2sTahrir%20Square!5e0!3m2!1sen!2seg!4v1702372645723!5m2!1sen!2seg"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
