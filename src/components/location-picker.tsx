"use client";

import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { toast } from "sonner";

interface LocationPickerProps {
  className?: string;
  onLocationSelect?: (lat: number, lng: number) => void;
}

export default function LocationPicker({
  className,
  onLocationSelect,
}: LocationPickerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([28.6139, 77.209], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current,
      );

      mapRef.current.on("click", (e: { latlng: { lat: any; lng: any } }) => {
        const { lat, lng } = e.latlng;
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng]).addTo(mapRef.current!);
        }
        onLocationSelect?.(Number(lat.toFixed(6)), Number(lng.toFixed(6)));
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [onLocationSelect]);

  const handleLocationRequest = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      // Request permission explicitly
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "denied") {
        throw new Error(
          "Location permission denied. Please enable location services",
        );
      }

      // Get position with options for better mobile support
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        },
      );

      const { latitude, longitude } = position.coords;

      // Update map and marker
      if (mapRef.current) {
        mapRef.current.setView([latitude, longitude], 16);

        if (markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]);
        } else {
          markerRef.current = L.marker([latitude, longitude]).addTo(
            mapRef.current,
          );
        }

        // Call callback with rounded coordinates
        onLocationSelect?.(
          Number(latitude.toFixed(6)),
          Number(longitude.toFixed(6)),
        );

        // toast.success("Location updated successfully");
        alert("Location updated successfully");
      }
    } catch (error) {
      console.error("Geolocation error:", error);
      // toast.error(error instanceof Error ? error.message : "Failed to get location");
      alert(error instanceof Error ? error.message : "Failed to get location");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-full">
      <div id="map" className={cn("absolute inset-0", className)} />
      <Button
        size="sm"
        variant="outline"
        className="absolute right-4 top-4 z-[400]"
        onClick={handleLocationRequest}
        disabled={isLoading}
      >
        {isLoading ? "Getting location..." : "Get My Location"}
      </Button>
    </div>
  );
}
