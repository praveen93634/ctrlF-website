"use client";

import React from "react";
import Image from "next/image";
import { Marquee } from "@/reuseable/Marquee";
import { RatingBadge } from "@/reuseable/RatingBadge";
import { customerContent } from "@/content/customer";

export function Customer() {
    const { ratingBadge, logos } = customerContent;

    return (
        <section
            aria-label="Customer Reviews and Partners"
            className="relative w-full overflow-hidden bg-[#faf8f5] py-5 sm:py-2"
        >
            <div className="flex  items-center px-6 sm:px-8 lg:px-[5%]">
                {/* Left: Stationary G2 Rating Badge */}
                <div className="flex shrink-0 items-center">
                    <RatingBadge
                        platform={ratingBadge.platform}
                        score={ratingBadge.score}
                        reviewsText={ratingBadge.reviewsText}
                        stars={ratingBadge.stars}
                        theme="auto"
                    />
                    {/* Subtle vertical divider separating badge from marquee */}
                    <div
                        className="mx-4 sm:mx-6 h-6 w-px bg-zinc-200 dark:bg-zinc-800 shrink-0"
                        aria-hidden="true"
                    />
                </div>

                {/* Right: Smooth Infinite Logo Marquee */}
                <div className="relative flex-1 overflow-hidden">
                    <Marquee speed={32} pauseOnHover gap="gap-10 sm:gap-14" repeat={3}>
                        {logos.map((logo) => (
                            <div
                                key={logo.name}
                                className="flex items-center justify-center shrink-0 px-2 group/logo cursor-pointer"
                                title={logo.name}
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={150}
                                    height={46}
                                    className="h-5 sm:h-7 w-auto max-w-[100px] sm:max-w-[150px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 dark:brightness-0 dark:invert dark:opacity-60 dark:hover:opacity-100 transition-all duration-300 group-hover/logo:scale-105"
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
}

export default Customer;
