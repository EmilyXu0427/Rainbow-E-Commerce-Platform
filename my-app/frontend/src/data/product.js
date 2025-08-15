import skincare1 from "../image/skincare_1.png";
import skincare2 from "../image/skincare_2.png";
import skincare3 from "../image/skincare_3.png";
import skincare4 from "../image/skincare_4.png";
import skincare5 from "../image/skincare_5.png";
import skincare6 from "../image/skincare_6.png";
import skincare7 from "../image/skincare_7.png";
import clothes8 from "../image/clothes_8.png";
import clothes9 from "../image/clothes_9.png";
import clothes10 from "../image/clothes_10.png";
import clothes11 from "../image/clothes_10.png";
import clothes12 from "../image/clothes_11.png";
import clothes13 from "../image/clothes_12.png";
import clothes14 from "../image/clothes_13.png";
import book15 from "../image/book_15.png";
import book16 from "../image/book_16.png";
import book17 from "../image/book_17.png";
import book18 from "../image/book_18.png";
import book19 from "../image/book_19.png";
import book20 from "../image/book_20.png";
import book21 from "../image/book_21.png";

export const PRODUCTS = [
	{
		id: 1,
		type: "skincare",
		name: "Glycolic Acid 7% Exfoliating Toner",
		price: 15.2,
		description:
			"A daily exfoliating toner formulated with 7% glycolic acid (AHA), that helps remove dead skin cells, revealing a smoother, more even texture.",
		image: skincare1,
		attributes: {
			brand: "The Ordinary",
		},
	},
	{
		id: 2,
		type: "skincare",
		name: "Lip Butter Balm Treatment for Hydration + Nourishing Shine",
		price: 32.5,
		description:
			"A nourishing vegan lip treatment with hydrating butters and waxes that soothes dryness, supports the lip barrier, and leaves a healthy-looking shine.",
		image: skincare2,
		attributes: {
			brand: "Summer Fridays",
		},
	},
	{
		id: 3,
		type: "skincare",
		name: "Pure Skin Face Cleanser – Gentle Hydrating Cleanser",
		price: 32.5,
		description:
			"A fragrance-free, gentle cleanser that effectively removes makeup, dirt, and grime, leaving skin soft and supple.",
		image: skincare3,
		attributes: {
			brand: "First Aid Beauty",
		},
	},
	{
		id: 4,
		type: "skincare",
		name: "Double Serum Anti-Aging",
		price: 160,
		description:
			"A two-in-one serum, powered by 22 plant extracts and five active molecules, that mimics skin to visibly firm, boost radiance, and target the appearance of wrinkles and pores in as few as seven days.",
		image: skincare4,
		attributes: {
			brand: "Clarins",
		},
	},
	{
		id: 5,
		type: "skincare",
		name: "Super Multi-Corrective Anti-Aging Eye Cream",
		price: 75,
		description:
			"A clean, anti-aging eye cream with niacinamide and collagen peptide that targets all four eye zones: the browbone area, eyelid, crow's feet, and under-eye.",
		image: skincare5,
		attributes: {
			brand: "Kiehl's Since 1851",
		},
	},
	{
		id: 6,
		type: "skincare",
		name: "Glowscreen SPF 40 Face Sunscreen with Hyaluronic Acid + Niacinamide",
		price: 52,
		description:
			"A glowy tinted sunscreen that hydrates skin & primes for makeup with a radiant finish & broad spectrum SPF protection.",
		image: skincare6,
		attributes: {
			brand: "Supergoop!",
		},
	},
	{
		id: 7,
		type: "skincare",
		name: "Face Mask with Hyaluronic Acid",
		price: 22,
		description:
			"A two-step mask inspired by Cryotherapy that moisturizes with Hyaluronic Acid and cools skin.",
		image: skincare7,
		attributes: {
			brand: "Dr. Jart+",
		},
	},
	{
		id: 8,
		type: "clothing",
		name: "Renae Ribbed Flyaway Cardigan",
		price: 49.95,
		description:
			"This cardigan is made from a soft rib knit fabric with a thick handfeel, designed to have a fitted silhouette. Wear it with one of our best-selling jeans.",
		image: clothes8,
		attributes: {
			brand: "Dynamite",
			colour: "Chalet Brown Melange",
			material: "92% rayon, 8% spandex",
		},
	},
	{
		id: 9,
		type: "clothing",
		name: "Belle Sweetheart Maxi Dress",
		price: 89.95,
		description:
			"This maxi dress is made from flowy and lightweight woven fabric, designed for a fitted silhouette. Wear it with a necklace on a night out.",
		image: clothes9,
		attributes: {
			brand: "Dynamite",
			colour: "White",
			material: "90% rayon, 10% linen",
		},
	},
	{
		id: 10,
		type: "clothing",
		name: "Ivory Front Seam Linen Mini Dress",
		price: 69.95,
		description:
			"This mini dress is made from airy and lightweight linen, designed for a fitted and flared silhouette. Style it with a light jacket for weekend getaways.",
		image: clothes10,
		attributes: {
			brand: "Dynamite",
			colour: "Rose Taupe",
			material: "52% linen, 48% viscose",
		},
	},
	{
		id: 11,
		type: "clothing",
		name: "The '90s Vintage Lo-rise Baggy Jean",
		price: 128,
		description:
			"Inspired by the perfect thrifted find from the '90s, The Vintage Lo-Rise Baggy features a classic fit and slouchy, straight leg. They’re cut from heavyweight, non-stretch denim that molds to your body over time. This fabric is sourced from a premier Italian mill and made with 100% regenagri-certified regenerative cotton. This version comes in a light indigo wash with a clean hem. ",
		image: clothes11,
		attributes: {
			brand: "Aritzia",
			colour: "Heathered Bone/Gold",
			material: "100% cotton",
		},
	},
	{
		id: 12,
		type: "clothing",
		name: "Scuba Oversized Half-Zip Hoodie",
		price: 118,
		description:
			"Serious about softness. This half-zip hooded sweatshirt is all about fleecy fabric and pairs perfectly with our Scuba sweatpants.",
		image: clothes12,
		attributes: {
			brand: "Lululemon",
			colour: "Blue Taboo",
			material: "97% Cotton, 3% Elastane",
		},
	},
	{
		id: 13,
		type: "clothing",
		name: "Wide Sleeve Knit Sweater",
		price: 55.9,
		description: "Round neck sweater with wide sleeves below the elbow.",
		image: clothes13,
		attributes: {
			brand: "Zara",
			colour: "Yellow",
			material: "79% polyester, 13% linen, 8% polyamide",
		},
	},
	{
		id: 14,
		type: "clothing",
		name: "MOFUSAND UT T-shirt",
		price: 29.9,
		description:
			'"mofusand" is a popular illustration featuring fluffy cats in costumes.The cute and slightly surrealistic cat characters illustrated by "Juno," active mainly on social media platforms, are now available as "Bread-Meow". This original collection is designed in the image of a fashionable bakery.',
		image: clothes14,
		attributes: {
			brand: "Uniqlo",
			colour: "Pink",
			material: "100% Cotton",
		},
	},
	{
		id: 15,
		type: "book",
		name: "To Kill a Mockingbird",
		price: 12.99,
		description:
			"A novel of warmth and humor despite dealing with serious issues of rape and racial inequality, seen through the eyes of a young girl in the Deep South.",
		image: book15,
		attributes: {
			author: "Harper Lee",
			publishYear: 1960,
		},
	},
	{
		id: 16,
		type: "book",
		name: "1984",
		price: 10.5,
		image: book16,
		description:
			"A dystopian novel that explores the dangers of totalitarianism and extreme political ideology through the story of Winston Smith in a surveillance state.",
		attributes: {
			author: "George Orwell",
			publishYear: 1949,
		},
	},
	{
		id: 17,
		type: "book",
		name: "Pride and Prejudice",
		price: 9.99,
		description:
			"A classic romantic novel that critiques the British class system while following the lively and witty Elizabeth Bennet as she navigates love and social norms.",
		image: book17,
		attributes: {
			author: "Jane Austen",
			publishYear: 1813,
		},
	},
	{
		id: 18,
		type: "book",
		name: "The Great Gatsby",
		price: 11.95,
		description:
			"A tale of wealth, love, and the American Dream during the Jazz Age, centered around the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.",
		image: book18,
		attributes: {
			author: "F. Scott Fitzgerald",
			publishYear: 1925,
		},
	},
	{
		id: 19,
		type: "book",
		name: "Harry Potter and the Philosopher's Stone",
		price: 14.5,
		description:
			"The first book in the Harry Potter series where a young boy discovers he is a wizard and begins his magical education at Hogwarts.",
		image: book19,
		attributes: {
			author: "J.K. Rowling",
			publishYear: 1997,
		},
	},
	{
		id: 20,
		type: "book",
		name: "The Hobbit",
		price: 13.25,
		description:
			"Bilbo Baggins, a quiet hobbit, is swept into a grand adventure with dwarves to reclaim treasure guarded by the dragon Smaug.",
		image: book20,
		attributes: {
			author: "J.R.R. Tolkien",
			publishYear: 1937,
		},
	},
	{
		id: 21,
		type: "book",
		name: "The Catcher in the Rye",
		price: 10.75,
		description:
			"A coming-of-age novel about teenage rebellion and alienation, narrated by the cynical and disenchanted Holden Caulfield.",
		image: book21,
		attributes: {
			author: "J.D. Salinger",
			publishYear: 1951,
		},
	},
];

export default PRODUCTS;
