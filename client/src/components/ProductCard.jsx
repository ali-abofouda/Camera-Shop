import { API_BASE } from '../config';

export default function ProductCard({ product }) {
  const isAvailable = product.status === 'available';
  const imageSrc = product.image_path
    ? `${API_BASE}${product.image_path}`
    : null;

  return (
    <div className="glass p-4 flex flex-col hover:scale-[1.02] transition cursor-default">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={product.name_ar}
          className="h-44 w-full object-cover rounded-lg mb-3"
        />
      ) : (
        <div className="h-44 w-full bg-white/10 rounded-lg flex items-center justify-center text-muted mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4.586-4.586A2 2 0 0110 11h4a2 2 0 011.414.586L20 16M14 8a2 2 0 11-4 0 2 2 0 014 0zM5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-semibold mb-1">{product.name_ar}</h3>
      <p className="text-muted text-sm flex-1 mb-3">{product.description_ar}</p>
      <span
        className={`badge self-start ${isAvailable ? 'bg-green-600/80 text-white' : 'bg-red-600/80 text-white'}`}
      >
        {isAvailable ? 'متوفر' : 'غير متوفر'}
      </span>
    </div>
  );
}
