import { Star } from "lucide-react";

export function ReviewCard({ name, vehicle, rating = 5, text, image }) {
  return (
    <div className="glass-card p-8 flex flex-col h-full mx-4">
      <div className="flex text-luxury-gold mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < rating ? "fill-luxury-gold" : "fill-transparent"}`} />
        ))}
      </div>
      
      <p className="text-gray-300 italic mb-8 flex-grow">"{text}"</p>
      
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-luxury-gold/30">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-luxury-secondary flex items-center justify-center text-luxury-gold font-bold text-lg">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-white">{name}</h4>
          <span className="text-luxury-gold text-sm">{vehicle}</span>
        </div>
      </div>
    </div>
  );
}
