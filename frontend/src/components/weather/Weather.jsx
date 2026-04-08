import React, { useState, useEffect } from 'react';
import { Cloud, Wind, Gauge, Droplets, Sun, Moon, CloudRain, CloudSnow, CloudLightning, Loader2, MapPin } from 'lucide-react';
import { useGeolocated } from 'react-geolocated';
import { getLocationName, getWeatherData } from '../../services/weatherService';

const getWeatherDetails = (code, isDay) => {
    const isNight = isDay === 0;
    const ClearIcon = isNight ? Moon : Sun;

    if (code === 0) return { label: 'Clear', icon: ClearIcon, accent: isNight ? 'text-indigo-500' : 'text-orange-400' };
    if ([1, 2, 3].includes(code)) return { label: 'Cloudy', icon: Cloud, accent: 'text-slate-400' };
    if ([45, 48].includes(code)) return { label: 'Fog', icon: Cloud, accent: 'text-gray-400' };
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: 'Rain', icon: CloudRain, accent: 'text-blue-500' };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snow', icon: CloudSnow, accent: 'text-sky-500' };
    if ([95, 96, 99].includes(code)) return { label: 'Thunder', icon: CloudLightning, accent: 'text-purple-500' };

    return { label: 'Unknown', icon: Cloud, accent: isNight ? 'text-indigo-500' : 'text-orange-400' };
};

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    useEffect(() => {
        const loadData = async (lat, lon) => {
            try {
                // Fetch location and weather concurrently for better performance
                const [locationName, weather] = await Promise.all([
                    getLocationName(lat, lon),
                    getWeatherData(lat, lon)
                ]);

                setWeatherData({
                    locationName,
                    ...weather
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (coords) {
            // Geolocation is unblocked and acquired
            loadData(coords.latitude, coords.longitude);
        } else if (isGeolocationAvailable === false || isGeolocationEnabled === false) {
            // Geolocation is blocked, disabled by user, or not supported by browser
            // Fallback to Berlin
            loadData(52.54, 13.41);
        }
        // If neither, then the geolocation is still verifying / user hasn't accepted yet. We keep it in the "Loading" state.
    }, [coords, isGeolocationAvailable, isGeolocationEnabled]);

    if (loading) {
        return (
            <div className='w-full max-w-[320px] min-h-[420px] flex flex-col items-center justify-center p-8 bg-white rounded-[2rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-slate-100 text-slate-500 font-sans'>
                <Loader2 className="animate-spin text-orange-400" size={32} />
                <p className="mt-4 text-sm font-medium text-center">
                    {!isGeolocationEnabled ? "Waiting for location..." : "Loading weather..."}
                </p>
            </div>
        );
    }

    if (!weatherData) {
        return (
            <div className='w-full max-w-[320px] min-h-[420px] flex flex-col items-center justify-center p-8 bg-white rounded-[2rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-slate-100 text-slate-500 font-sans'>
                <p className="text-sm font-bold text-slate-400">Failed to load weather</p>
            </div>
        );
    }

    const { label, icon: WeatherIcon, accent } = getWeatherDetails(weatherData.weatherCode, weatherData.isDay);

    return (
        <div
            className={`w-full max-w-[320px] min-h-[420px] flex flex-col justify-between p-8 bg-white rounded-[2rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-slate-100 font-sans transition-colors duration-1000`}
        >
            {/* Top Section */}
            <div className="flex flex-row justify-between items-start w-full">
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="font-bold text-base text-slate-800 tracking-tight">{weatherData.locationName}</span>
                    </div>
                    <span className="text-slate-500 font-medium text-sm flex items-center gap-1.5">
                        <WeatherIcon size={14} className={`${accent}`} /> {label}
                    </span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 shadow-sm flex items-center justify-center">
                    <WeatherIcon className={`${accent}`} size={24} strokeWidth={2} />
                </div>
            </div>

            {/* Middle Section: Temperature */}
            <div className="flex flex-col justify-center my-2 text-center">
                <div className="font-light text-6xl tracking-tight text-slate-800 tabular-nums">
                    {weatherData.temperature}°
                </div>
            </div>

            {/* Bottom Section: Details */}
            <div className="flex flex-row justify-between items-center w-full bg-slate-50 p-4 rounded-[1.25rem] border border-slate-100 shadow-sm relative">
                <div className="flex flex-col items-center gap-1">
                    <Wind size={16} className="text-orange-400" />
                    <p className="text-xs font-bold text-slate-700">{weatherData.windSpeed} <span className="text-[10px] font-medium text-slate-400">km/h</span></p>
                </div>
                <div className="w-px h-6 bg-slate-200" />
                <div className="flex flex-col items-center gap-1">
                    <Gauge size={16} className="text-orange-400" />
                    <p className="text-xs font-bold text-slate-700">{weatherData.pressure} <span className="text-[10px] font-medium text-slate-400">mb</span></p>
                </div>
                <div className="w-px h-6 bg-slate-200" />
                <div className="flex flex-col items-center gap-1">
                    <Droplets size={16} className="text-orange-400" />
                    <p className="text-xs font-bold text-slate-700">{weatherData.humidity}<span className="text-[10px] font-medium text-slate-400">%</span></p>
                </div>
            </div>
        </div>
    );
};

export default Weather;