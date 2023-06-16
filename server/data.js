import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
          name: 'Abdullah',
          email: 'abdullah.shah7839@gmail.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: true,
        },
        {
          name: 'Sami',
          email: 'sami@gmail.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: false,
        },
      ],
    products: [
            {
            "title": "Mens T-Shirts ",
            "price": 22.3,
            "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
            "category": "men's clothing",
            "image": "https://tse4.mm.bing.net/th?id=OIP.HKuVszPivig3_km3b3xncAHaJT&pid=Api&P=0&h=180",
            "rating": 4.5,
            "numReviews": 10,
            "stock": 1
            },
            {
      
            "title": "Mens Cotton Jacket",
            "price": 55.99,
            "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
            "category": "men's clothing",
            "image": "https://tse2.mm.bing.net/th?id=OIP.MiC3qJHZMuRqvSpRNC9uPwHaHa&pid=Api&P=0&h=180",
            "rating": 4.5,
            "numReviews": 10,
           
            "stock": 5
            },
            {
           
            "title": "Solid Gold Petite Micropave ",
            "price": 168,
            "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
            "category": "jewelery",
            "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
            "rating": 4.5,
            "numReviews": 10,
            
            "stock": 5
            },
            {
          
            "title": "White Gold Plated Princess",
            "price": 9.99,
            "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
            "category": "jewelery",
            "image": "https://tse4.mm.bing.net/th?id=OIP.luDpkvjT9ic2h77YaQqIvgHaHa&pid=Api&P=0&h=180",
            "rating": 4.5,
            "numReviews": 10,
           
            "stock": 1
            },
            {
           
            "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
            "price": 10.99,
            "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
            "category": "jewelery",
            "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
            "rating": 4.5,
            "numReviews": 10,
          
            "stock": 6
            },
            {
       
            "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
            "price": 64,
            "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
            "category": "electronics",
            "image": "https://tse1.mm.bing.net/th?id=OIP.9-Bzay_0Kw3_qX6jeiCppQHaHa&pid=Api&P=0&h=180",
            "rating": 4.5,
            "numReviews": 10,
            
            "stock": 1
            },
            {
          
            "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
            "price": 109,
            "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
            "category": "electronics",
            "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
            "rating": 4.5,
            "numReviews": 10,
           
            "stock": 5
            },
            {
          
            "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
            "price": 109,
            "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
            "category": "electronics",
            "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
            "rating": 4.5,
            "numReviews": 10,
            
            "stock": 1
            },
            {
         
            "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
            "price": 114,
            "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
            "category": "electronics",
            "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
            "rating": 4.5,
            "numReviews": 10,
           
            "stock": 5
            },
            {
           
            "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
            "price": 599,
            "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
            "category": "electronics",
            "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
            "rating": 4.5,
            "numReviews": 10,
            
            "stock": 1
            },
            {
            
            "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
            "price": 999.99,
            "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
            "category": "electronics",
            "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
            "rating": 4.5,
            "numReviews": 10,
            "__v": 0,
            "createdAt": "2023-05-31T16:10:50.596Z",
            "updatedAt": "2023-06-13T05:29:11.479Z",
            "stock": 1
            },
            {
            "_id": "6477718a10ef9a26d78a85d7",
            "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
            "price": 56.99,
            "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
            "category": "women's clothing",
            "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
            "rating": 4.5,
            
            "stock": 5
            },
            {
          
            "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
            "price": 29.95,
            "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
            "category": "women's clothing",
            "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
            "rating": 4.5,
           
            "stock": 7
            },
            {
           
            "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
            "price": 39.99,
            "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
            "category": "women's clothing",
            "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
            "rating": 4.5,
            "numReviews": 10,
       
            "stock": 7
            },
            {
          
            "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
            "price": 9.85,
            "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
            "category": "women's clothing",
            "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
            "rating": 4.5,
            "numReviews": 10,
           
            "stock": 10
            },
            {
            "_id": "6477718a10ef9a26d78a85dc",
            "title": "DANVOUY Womens T Shirt Casual Cotton Short",
            "price": 12.99,
            "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
            "category": "women's clothing",
            "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
            "rating": 4.5,
            "numReviews": 10,
            "__v": 0,
            "createdAt": "2023-05-31T16:10:50.596Z",
            "updatedAt": "2023-06-13T05:30:29.144Z",
            "stock": 5
            },
            {
            
            "title": "Dell Laptop ",
            "price": 14555,
            "description": "Cori 5  Dell Technologies recommends Windows 11 Pro for business\nWarranty support options vary by operating system: Dell offers support plans for businesses with Windows Pro and support plans for personal use with Windows Home.",
            "category": "electronics",
            "image": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/16-5620/media-gallery/notebook-inspiron-16-5620-2-in-1-gy-fpr-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&wid=4000&hei=2819&qlt=100,1&resMode=sharp2&size=4000,2819&chrss=full&imwidth=5000",
            "rating": 4.5,
            "numReviews": 13,
          
            "stock": 6
            },
            {
            
            "title": "Headphones ",
            "price": 125,
            "description": "In this example, I've replaced styled-components with CSS classes from React Bootstrap for styling the table, buttons, form inputs, and other elements. Inline styles are used when necessary. Remember to include the necessary CSS files for React Bootstrap and any custom CSS classes you might have defined.",
            "category": "electronics",
            "image": "https://tse1.mm.bing.net/th?id=OIP.yhNzt6gHqMpqdq_eClR7mQHaHa&pid=Api&P=0&h=180",
            "rating": 4.5,
            "numReviews": 100,
        
            "stock": 8
            },
            {
            
            "title": "Amazfit GTS 3 Smart Watch for Android iPhone, Alexa Built-In, GPS Fitness Sports Watch with 150 Sports Modes, 1.75” AMOLED Display, 12-Day Battery Life, Blood Oxygen Heart Rate Tracking, Black",
            "price": 125,
            "description": "【ALEXA BUILT-IN & OFFLINE ASSISTANT】 Easily set an alarm, ask a question, get a translation and more with Alexa, which is built into the Amazfit GTS 3 smart watch. If you’re out and don’t have internet access, the smartwatch also has an offline voice assistant for you to perform operations like engaging a sports mode or opening a health metric feature via voice command..Suported Application:Breath Monitor,Heart Rate Monitor,GPS,Voice Control,Multisport Tracker. Connectivity technology:GPS. Wireless comm standard:Bluetooth\n【HIGH PRECISION & POWERFUL NAVIGATION SYSTEMS】The GTS 3 smartwatch has a built-in barometric altimeter to help keep an eye on the altitude and air pressure of your outdoor activities, and suports GPS, GLONASS, Galileo, BDS and QZSS satellite navigation systems to accurately track your route.\n【150plus SPORTS MODES & 5 ATM WATER RESISTANCE】The Amazfit GTS 3 sports watch is the ultimate easy-to-use smartwatch with over 150 built-in sports modes to suit your choice of activity. It can track metrics like heart rate, calories burned, and assesses specialized data such as maximum oxygen upake (VO2 Max), full recovery time, training load and training effect. With a water-resistance grade of 5 ATM, allowing you to enjoy the sea or take a dip in a pool without worry.",
            "category": "electronics",
            "image": "https://m.media-amazon.com/images/I/61v3RM+Y9-L._AC_SX679_.jpg",
            "rating": 3.5,
            "numReviews": 25,
            "stock": 8
            },
            {
            "title": "Diamond Channel-Set Wedding Ring",
            "price": 25,
            "description": "Make your love resonate with this enduring platinum wedding band, showcasing illuminating channel-set diamonds.Make your love resonate with this enduring platinum wedding band, showcasing illuminating channel-set diamonds.Make your love resonate with this enduring platinum wedding band, showcasing illuminating channel-set diamonds.Make your love resonate with this enduring platinum wedding band, showcasing illuminating channel-set diamonds.",
            "category": "jewelery",
            "image": "https://bnsec.bluenile.com/bluenile/is/image/bluenile/-wedding-rings/diamond-channel-set-wedding-ring-platinum-/53031_main?$phab_detailmain$",
            "rating": 2.5,
            "numReviews": 17,
            "stock": 8,
            },
            ],
    
};
export default data;