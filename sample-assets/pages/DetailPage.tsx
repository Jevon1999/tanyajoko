
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_DESTINATIONS, MOCK_REVIEWS } from '../constants';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dest = MOCK_DESTINATIONS.find(d => d.id === id);

  if (!dest) return <div className="p-20 text-center">Destination not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link className="hover:text-primary transition-colors" to="/">Home</Link>
        <span className="material-icons-round text-xs">chevron_right</span>
        <span className="hover:text-primary transition-colors">Yogyakarta</span>
        <span className="material-icons-round text-xs">chevron_right</span>
        <span className="text-slate-900 dark:text-white font-medium">{dest.name}</span>
      </div>

      {/* Hero */}
      <div className="relative h-[480px] rounded-3xl overflow-hidden mb-12 shadow-2xl group">
        <img alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={dest.image} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="text-white">
            <h1 className="text-5xl font-extrabold mb-2">{dest.name}</h1>
            <div className="flex items-center gap-2 text-slate-200">
              <span className="material-icons-round text-primary">location_on</span>
              <span>{dest.location}</span>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl w-full md:w-80 shadow-lg border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Entry Fee</span>
                <span className="text-xl font-bold text-slate-900">{dest.price} <span className="text-sm font-normal text-slate-500">/ person</span></span>
              </div>
              <button className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-rose-500 hover:bg-rose-50 shadow-sm transition-all">
                <span className="material-icons-round">favorite_border</span>
              </button>
            </div>
            <div className="space-y-3 border-t border-slate-200 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="material-icons-round text-primary text-lg">schedule</span>
                <span className="text-slate-700">{dest.hours}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-icons-round text-primary text-lg">directions_car</span>
                <span className="text-slate-700">{dest.distanceFromCenter}</span>
              </div>
            </div>
            <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-3 rounded-xl mt-6 shadow-md transition-all flex items-center justify-center gap-2">
              <span className="material-icons-round">map</span>
              Get Directions
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* AI Insights */}
          <section className="bg-primary/5 border border-primary/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="material-icons-round text-background-dark">smart_toy</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Tanya Joko Says</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">AI-Powered Insights</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold text-primary flex items-center gap-2">
                  <span className="material-icons-round text-sm">auto_awesome</span> Why visit?
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{dest.whyVisit}</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-primary flex items-center gap-2">
                  <span className="material-icons-round text-sm">lightbulb</span> Pro Tips
                </h4>
                <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
                  {dest.proTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="material-icons-round text-primary text-xs mt-1">check_circle</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* User Experiences */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">User Experiences</h2>
              <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                View All Photos <span className="material-icons-round text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-md group relative h-[320px]">
                <img className="w-full h-full object-cover transition-transform group-hover:scale-110" src="https://picsum.photos/seed/gall1/600/600" alt="Gallery" />
              </div>
              {[2, 3, 4, 5].map(n => (
                <div key={n} className="rounded-2xl overflow-hidden shadow-md group relative h-36">
                  <img className="w-full h-full object-cover transition-transform group-hover:scale-110" src={`https://picsum.photos/seed/gall${n}/200/200`} alt="Gallery" />
                  {n === 5 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">+24</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">What Travelers Say</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-primary">
                    {[1, 2, 3, 4, 5].map(star => <span key={star} className="material-icons-round text-sm">star</span>)}
                  </div>
                  <span className="text-sm font-bold">4.8</span>
                  <span className="text-sm text-slate-400 font-medium">({dest.reviews} Reviews)</span>
                </div>
              </div>
              <button className="bg-primary text-background-dark px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                <span className="material-icons-round">add_comment</span> Write Review
              </button>
            </div>

            <div className="space-y-4">
              {MOCK_REVIEWS.map(rev => (
                <div key={rev.id} className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden">
                        {rev.userAvatar.startsWith('http') ? <img src={rev.userAvatar} className="w-full h-full object-cover" /> : rev.userAvatar}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm">{rev.userName}</h5>
                        <p className="text-xs text-slate-500">{rev.date}</p>
                      </div>
                    </div>
                    <div className="flex text-primary">
                      {Array.from({ length: rev.rating }).map((_, i) => <span key={i} className="material-icons-round text-sm">star</span>)}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{rev.comment}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                    <button className="flex items-center gap-1 hover:text-primary"><span className="material-icons-round text-sm">thumb_up</span> {rev.helpfulCount} Helpful</button>
                    <button className="flex items-center gap-1 hover:text-primary"><span className="material-icons-round text-sm">reply</span> Reply</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-slate-400 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              Load More Reviews
            </button>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-white/5 shadow-lg">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span className="material-icons-round text-primary">place</span> Location
            </h3>
            <div className="h-48 rounded-xl overflow-hidden relative mb-4">
              <img alt="Map" className="w-full h-full object-cover" src="https://picsum.photos/seed/map/400/300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-primary rounded-full animate-pulse flex items-center justify-center shadow-lg">
                  <span className="material-icons-round text-white">location_on</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">{dest.location}</p>
            <button className="w-full text-center text-primary font-bold text-sm py-2 border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors">
              Copy Address
            </button>
          </div>

          <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-2xl border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Local Weather</span>
              <span className="material-icons-round text-primary">wb_sunny</span>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-3xl font-bold">28°C</span>
              <span className="text-sm text-slate-600 font-medium mb-1">Partly Cloudy</span>
            </div>
            <p className="text-xs text-slate-500 italic">"Joko says: Great weather for photography today. Don't forget your sunscreen!"</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DetailPage;
