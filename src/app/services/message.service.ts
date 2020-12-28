export class MessageService {
        // form registrasi message
        public static errorMessages = {
                fname: [
                        { type: 'required', message: 'First Name is required' },
                ],
                season: [
                        { type: 'required', message: 'Season is required' },
                ],
                weeks: [
                        { type: 'required', message: 'Week is required' },
                ],
                username: [
                        { type: 'required', message: 'Please Enter your username.' },
                ],
                password: [
                        { type: 'required', message: 'Please Enter your password.' },
                ],
                lname: [
                        { type: 'required', message: 'Last Name is required' },
                ],
                phone: [
                        { type: 'required', message: 'Phone number is required' },
                        { type: 'pattern', message: 'Please fill in only numeric (ex. 0857871XXXX)' }
                ],
                email: [
                        { type: 'required', message: 'Email is required' },
                        { type: 'pattern', message: 'Please enter a valid email address' }
                ],
                filename: [
                        { type: 'required', message: 'Filename is required!.' },
                ],
                devTo: [
                        { type: 'required', message: 'Delivery to / Name is required (Nama Penerima)' },
                ],
                address: [
                        { type: 'required', message: 'Address is required' },
                ],
                Province: [
                        { type: 'required', message: 'Province is required' },
                ],
                City: [
                        { type: 'required', message: 'City is required' },
                ],
                District: [
                        { type: 'required', message: 'District is required' },
                ],
                postcode: [
                        { type: 'required', message: 'Post Code is required' },
                ],
                birthplace: [
                        { type: 'required', message: 'Tempat Lahir is required' },
                ],
                Hobby: [
                        { type: 'required', message: 'Hobby is required' },
                ],
                LastEdu: [
                        { type: 'required', message: 'Pendidikan Terakhir is required' },
                ],
                EduStatus: [
                        { type: 'required', message: 'Status Pendidikan is required' },
                ],
                graduateyear: [
                        { type: 'required', message: 'Tahun Angkatan is required' },
                ],
                height: [
                        { type: 'required', message: 'Tinggi Badan is required' },
                ],
                weight: [
                        { type: 'required', message: 'Berat badan is required' },
                ],
                isgrooming: [
                        { type: 'required', message: 'Grooming is required' },
                ],
                University: [
                        { type: 'required', message: 'Universitas is required' },
                ],
                Major: [
                        { type: 'required', message: 'Jurusan is required' },
                ],
                isillhistory: [
                        { type: 'required', message: 'Riwayat Kesehatan is required' },
                ],
                isTatoo: [
                        { type: 'required', message: 'Tatto is required' },
                ],
        };

        public static topBannerSettings = {
                giftForHer: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/top-banner-1.jpg',
                        title: 'The Perfect Gifts for Her',
                        // tslint:disable-next-line: max-line-length
                        subtitle: 'Crafted with exceptional-quality and precision, accessorize with PEDRO’s select pieces. ' +
                        'Designed to deliver a fresh look and comfortable feel, each piece offers chic layers of style' +
                        ' and functionality — making it the perfect holiday gift for the mod maven.'
                },
                giftForHim: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/top-banner-2.jpg',
                        title: 'The Perfect Gifts for Him',
                        subtitle: 'Crafted with exceptional-quality and precision, accessorize with PEDRO’s select pieces.' +
                        'Designed to deliver a fresh look and comfortable feel, each piece offers chic layers of style and'
                        + 'functionality — making it the perfect holiday gift for the mod maven.'
                 },
                //  Trending Women
                 pedroStudio: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/pedro-studio.jpg',
                        title: 'PEDRO STUDIO',
                        subtitle: 'Featuring quality pieces from our latest summer edit, our collection has' + 
                        'statement pieces that stay relevant throughout all seasons.'
                 },
                 Lounging: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/lounging.jpg',
                        title: 'Lounging in Style',
                        subtitle: 'Find the perfect footwear for this summer to match your daily wears'
                 },
                 summerChecklist: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/summer-checklist-white-bags.jpg',
                        title: 'Summer Checklist: White Bags',
                        subtitle: 'The perfect summer\'s effortless update'
                 },
                //  forAllTheWomen: {
                //         imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/for-all-wonderfull.jpg',
                //         title: 'For all the Wonderful Women',
                //         subtitle: 'Express some love and gratitude with our curated selection of thoughtful gifts'
                //  },
                 forAllTheWomen: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/for-all-wonderfull.jpg',
                        title: 'All You Need is Love and Leather',
                        subtitle: 'Express some love and gratitude with our curated selection of thoughtful gifts'
                 },
                 HerEveryDayStaples: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/her-your-everyday.jpg',
                        title: 'Her: Your Everyday Staples',
                        subtitle: 'From evening to everyday, touch up your looks with our leather collection.'
                 },
                //  End Trending Women

                // Men Top Banner
                GuideForThisSummerStyle: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/guide-for-this-summer.jpg',
                        title: 'Guide For This Summer Style',
                        subtitle: 'Here\'s a curated list of shoes, accessories and bags for your summer update'
                 },
                 HimWorkCompanion: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/him-work-companion.jpg',
                        title: 'Him: Work Companion',
                        subtitle: 'Find the perfect sleek styles for the everyday essentials'
                 },
                 SpringVacation: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/him-work-companion.jpg',
                        title: 'Spring Vacation',
                        subtitle: 'Get in touch with nature with pieces that\'s suitable for your laidback weekend'
                 },
                 IndependentlyStylish: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/independently-stylish.jpg',
                        title: 'Independently Stylish',
                        subtitle: 'A commitment to Indonesia\'s Indepedence through stylish expression.'
                 },
                //  ChecklistSneakers: {
                //         imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/checklist-sneaker.jpg',
                //         title: '2020 Checklist: MMXX Sneakers',
                //         subtitle: 'We invented MMXX, the sneakers of the year. Tailored to both genders in different shades, and taking you to new heights'
                //  },
                ChecklistSneakers: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/banner/checklist-sneaker.jpg',
                        title: 'You Deserve a New Sneakers',
                        subtitle: 'Introducing the perfect sneakers for your fashion statement. Made to completes your athleisure ensembles'
                 },
                // End Top Banner Men

                // Arriving Soon
                arrivingMen: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/arriving/Men.jpg',
                        title: 'Arriving Soon for Him',
                        subtitle: 'A sling on the go, suitable for daily essentials. Perfect to accompany you in working day with comfortable feels.'
                 },

                 arrivingWomen: {
                        imgUrl: 'https://clouds.ptkcg.co.id/pedro/arriving/Women.jpg',
                        title: 'Arriving Soon for Her',
                        subtitle: 'Your essential statement to start your day. White out in bag that blending for all right reasons.'
                 },

                
        };
        constructor() { }
}
