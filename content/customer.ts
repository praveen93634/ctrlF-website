export interface CustomerLogo {
  name: string;
  src: string;
  alt: string;
}

export interface CustomerContent {
  ratingBadge: {
    platform: string;
    score: string;
    reviewsText: string;
    stars: number;
  };
  logos: CustomerLogo[];
}

export const customerContent: CustomerContent = {
  ratingBadge: {
    platform: "G2",
    score: "4.5",
    reviewsText: "Rated 4.5 (2k+ reviews)",
    stars: 4.5,
  },
  logos: [
    { name: "Adobe", src: "/logos/Company=Adobe.png", alt: "Adobe logo" },
    { name: "Airbnb", src: "/logos/Company=Airbnb.png", alt: "Airbnb logo" },
    { name: "Amplitude", src: "/logos/Company=Amplitude.png", alt: "Amplitude logo" },
    { name: "Booking.com", src: "/logos/Company=Booking.com.png", alt: "Booking.com logo" },
    { name: "BrowserStack", src: "/logos/Company=BrowserStack.png", alt: "BrowserStack logo" },
    { name: "DoorDash", src: "/logos/Company=DoorDash.png", alt: "DoorDash logo" },
    { name: "Freshworks", src: "/logos/Company=Freshworks.png", alt: "Freshworks logo" },
    { name: "Grammarly", src: "/logos/Company=Grammarly.png", alt: "Grammarly logo" },
    { name: "PayPal", src: "/logos/Company=PayPal.png", alt: "PayPal logo" },
    { name: "Pipedrive", src: "/logos/Company=Pipedrive.png", alt: "Pipedrive logo" },
    { name: "Razorpay", src: "/logos/Company=Razorpay.png", alt: "Razorpay logo" },
    { name: "Rippling", src: "/logos/Company=Rippling.png", alt: "Rippling logo" },
  ],
};

