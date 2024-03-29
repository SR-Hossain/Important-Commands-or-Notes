```css

/* ==UserStyle==
@name           StretchGPT: Extra-wide ChatGPT Conversations
@version        4.0.5
@description    Improves ChatGPT conversation readability by removing the narrow fixed content width and replacing it with subtle, adaptive padding for a consistent UX across all screen sizes. Toggleable sidebar UI enhancements also available for desktop viewports.
@namespace      https://example.com/your-namespace
@preprocessor   less
@var checkbox   enableColorIndicators  "Color Indicators for User Prompts/Messages" 1
@var select     indicatorColor "Indicator Color" {
	"Purple Haze": "#807396",
	"Japanese Violet": "#5B3256",
	"Sharp Indigo": "#48007c",
	"Cyber Grape": "#58427C",
	"Super Blue Lavender": "#5a5b9f",
	"Dark and Stormy": "#353f51",
	"Deep Space": "#2D3142",
	"Black Pearl": "#1e272c",
	"Caviar": "#292a2d",
	"Black Sabbath": "#220022",
	"Tokyo Midnight": "#1a1a2e",
	"Obsidian Ash": "#343434",
	"Blue Moss": "#5D737E",
	"Dusty Turquoise*": "#5a8a89",
	"Aged Sage": "#8da572",
	"Gameboy Teal": "#0ABFBC",
	"Emerald": "#0f380f",
	"Aztek": "#293432",
	"Deep Jungle": "#1A2421",
	"Ancient Gold": "#b59410",
	"Cardamom": "#aaaa77",
	"Earl Grey": "#a6978a",
	"Cyprus": "#545a3e",
	"Lobster Bisque": "#FFDAB9",
	"Amaretto": "#ab6f60",
	"Sakura Bloom": "#ff7b9c",
	"FF06B5": "#FF06B5",
}
@var checkbox   hideAvatars "Hide Avatars" 1
@var checkbox   mobileLayout "[Desktop Only] Mobile Message Layout on Desktop - Always show action buttons in a separate row below the text in ChatGPT responses (default behavior when 'Hide avatars' is active)" 1
@var checkbox   sidebarTweaks "[Desktop Only] Sidebar/Chat History UI Tweaks" 1
==/UserStyle== */

@-moz-document domain("chat.openai.com") {
	/********* MESSAGES *********/
	/* ===== Main/Outer Div ===== */
    .relative.pb-3.pt-2.text-center.text-xs {
        display: none;
    }

    .cursor-pointer.absolute.right-6.rounded-full{
        position: fixed !important;
        left: 22.5%;
        bottom: 10%;
        z-index: 35462 !important;
    }

    .relative.flex.h-full.flex-1.items-stretch {
        top: 0 !important;
    }
    .btn.relative.btn-neutral.whitespace-nowrap {
      position: fixed !important;
       top: 0% ;
        left: 8.5%;
        min-width: 150px !important;
        height: 20px !important;

    }

    .absolute.bottom-0.left-0.w-full.border-t  {
        position: fixed;
        left: 0;
        width: 305px !important;
        margin: 0 !important;
        min-height: 40px !important;
        z-index: 352 !important;
    }

    .flex-shrink-0.overflow-x-hidden.dark.bg-gray-900{
        height: 90vh !important;
        z-index: -2 !important;
    }



	div.group.w-full.border-b {
		--pt: 1rem;
		--pb: 1rem;
		--pl: max(calc(1vw*1rem), 1rem);
		--pr: max(calc(1vw*1rem), 1rem);

		padding: var(--pt) var(--pr) var(--pb) var(--pl);

		@media (min-width: 768px) {
			--pt: 1.5rem;
			--pl: 2vw;
			--pr: 2vw;
			@media (min-width: 1536px) {
				--pt: min(calc(3vh*1rem), 1.5rem);
				--pl: 1.5rem;
				--pr: 1.5rem;
			}
		}

		/* ===== User Message ===== */
		&.dark\:bg-gray-800 when(@mobileLayout = 1), (@hideAvatars = 1) {
			/* Reduce user messages' horiz. padding on hover to prevent absolutely positioned "edit" button from overlapping with text */
			@media (min-width: 1024px) {
				--pr: calc(1vw + 1.5rem);
				@media (min-width: 1536px) {
					--pr: calc(2vw + 2rem);
				}
			}
		}

		/* ===== ChatGPT Message ===== */
		&:not(.dark\:bg-gray-800) {
			div.relative.flex-col.gap-1.md\:gap-3 when(@mobileLayout = 1) and (@hideAvatars = 0) {
				@media (min-width: 1024px) {
					width: calc(100% - calc(1vw + 1.5rem));
					@media (min-width: 1536px) {
						width: calc(100% - calc(2vw + 2rem));
					}
				}
			}
		}

		/* Add colored left border to User messages when "enableColorIndicators" is on */
		& when(@enableColorIndicators = 1) {
			@gc-1: @indicatorColor;
			@gc-2: if(
				saturation(@indicatorColor) > 50%,
				if(lightness(@indicatorColor) < 20%,
					lighten(@indicatorColor, 5%),
					desaturate(@indicatorColor, 20%),
				),
				saturate(@indicatorColor, 20%)
			);
			border-image-source: repeating-linear-gradient(30deg, @gc-1 30%, @gc-2, 60%, @gc-1 95%);
			border-image-slice: 30;
			border-bottom: 0;
			border-left-width: 8px;

			@media (min-width: 1536px) {
				border-left-width: 10px;
			}

			&:not(.dark\:bg-gray-800) {
				border-left-color: #444654;
				border-image-source: none;
			}
		}

		//! TEMP: this feature broke after OpenAI's latest update so I'm just disabling it until I have the time to make a proper fix
		// & when(@hideAvatars = 0) and (@mobileStackedAvatar = 1) {
		// 	@media (max-width: 500px) {
		// 		padding: 0.9rem 1rem;
		// 		> div {
		// 			flex-direction: column;
		// 			align-items: center;
		// 			> div:first-child {
		// 				padding-bottom: 0.5rem;
		// 				+ div {
		// 					width: 95%;
		// 				}
		// 			}
		// 		}

		// 		/* Empty spacer div that the prompt input field is absolutely positioned on */
		// 		~ div.h-32.md\:h-48.flex-shrink-0 {
		// 			height: 6rem;
		// 			margin-top: 1rem;
		// 		}
		// 	}
		// }

		/* ===== Inner Div ===== */
		// Inner #1 (new w/ Aug 30/23 update):
		> div.p-4.justify-center.m-auto {
			padding-top: 0;
			padding-bottom: 0;

			@media (max-width: 768px) {
				padding-left: 0;
				padding-right: 0;
			}

			// Inner #2:
			> div.flex.flex-1.mx-auto.md\:max-w-3xl, // set of classes when sidebar is closed
			> div.flex.mx-auto.md\:max-w-2xl.lg\:max-w-\[38rem\].xl\:max-w-3xl, // classes when sidebar is open
			> div:only-child { // fallback selector in case the classes change again in the future
				max-width: none !important;
				gap: 0.5rem;
				padding: 0;

				@media (min-width: 1536px) {
					gap: 1rem;
				}

				/* ===== Hide Avatars ===== */
				& when(@hideAvatars = 1) {
					> div:first-child {
						display: none;
					}
					@media (min-width: 1536px) {
						padding-left: 0;
					}

					.markdown.prose > ol,
					.markdown.prose > ul {
						padding-left: max(calc(1vw * 1rem), 0.5rem);
					}
				}

				/* ===== Message Content Div===== */
				> div:last-child {
					padding: 0 !important;

					div.lg\:absolute.lg\:top-0.lg\:translate-x-full.lg\:right-0.lg\:mt-0.lg\:pl-2 {
						&, > div.flex.gap-1 {
							gap: 0;
						}
						button {
							padding: 3px
						}
					}

					& when(@mobileLayout = 1), (@hideAvatars = 1) {
						& when(@hideAvatars = 1) {
							width: 100%;
						} & when(@hideAvatars = 0) {
							@media (min-width: 1024px) {
								width: 100%;
							}
						}

						/* ===== Message Text ===== */
						> div:nth-child(2n) {
							padding: 0;

							/* ===== Action Button Group ===== */
							> div.lg\:absolute.lg\:top-0.lg\:translate-x-full.lg\:right-0.lg\:mt-0.lg\:pl-2 {
								position: relative;
								transform: none !important;
								margin-top: 0;

								@media (min-width: 1024px) and (max-width: 1536px) {
									padding-left: 0rem;
								}
							}
						}
					}
				}
			}
		}
	}

	/********* SIDEBAR TWEAKS *********/

	.sidebarTweaks() when(@sidebarTweaks = 1) {
		@media (min-width: 768px) {
			/* ===== Sidebar: Main Div ===== */
			div#__next div.overflow-hidden.w-full.h-full.relative.flex.z-0 {
				/* ===== Nav ===== */
				nav[aria-label="Chat history"] {
					&.p-2 {
						padding-left: 0.2rem;
					}

					/* ===== Chat History ===== */
					/* Named timeframe group (Today, Yesterday, etc.) */
					div.sticky.top-0.z-\[14\],
					div.sticky.top-0.z-\[16\] {
						backdrop-filter: brightness(130%);
						filter: brightness(130%);
						margin-left: -0.5rem;
						border-top: 1px inset #6b6e7f;
					}

					/* Chat History Item */
					a.flex.py-3.px-3.items-center.gap-3.relative.rounded-md {
						align-items: flex-start;
						margin: 3px 3px 3px 0;
						padding: .4rem 0 .4rem .4rem;
						gap: 0.3rem;
						line-height: 1.35;
						border-radius: 2px;

						/* Chat Icon */
						> svg {
							width: 0.75rem;
							padding-top: 0.25rem;
						}

						/* Active Chat Item */
						&.bg-gray-800 {
							> div:last-child {
								&.absolute {
									position: inherit;
								}

								/* Action Buttons */
								button.p-1 {
									transition: 0.2s all;
									&, & > svg {
										padding: 0.1rem;
									}

									&:hover {
										filter: brightness(1.5);
										background: rgb(91 93 107 / 25%);
										border-radius: 2px;
									}
								}
							}
						}

						/* Chat Title */
						div.flex-1.text-ellipsis.max-h-5.overflow-hidden.break-all {
							max-height: 3rem;
							font-size: 0.75rem;
							word-break: normal;
							overflow: normal;
							padding-right: 0.5rem;

							> div.bg-gradient-to-l {
								display: none;
							}
						}
					}
				}
			}
		}
	}

	.sidebarTweaks();
}

```
