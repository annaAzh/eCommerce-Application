import { AboutUsType } from 'shared/types';
import Irina from '../assets/img/teams/irina.webp';
import Irina2 from '../assets/img/teams/irina2.jpg';
import Andrew from '../assets/img/teams/andrew.webp';
import Andrew2 from '../assets/img/teams/andrew2.jpg';
import Anna from '../assets/img/teams/anna.webp';
import Anna2 from '../assets/img/teams/anna2.jpg';

export const aboutUs: AboutUsType[] = [
  {
    name: 'Anna',
    role: 'Team lead',
    bio: "Anna's coding adventure began when she tried to build a website for her pet hamster, Nibbles, to track his exercise wheel stats. Now, as the Team Lead of Meowww, she combines her love for animals and coding to create an unparalleled user experience. When she's not debugging code, you can find her convincing Nibbles to run just one more lap for the sake of accurate data.",
    contribution:
      "Anna spearheaded the development of the registration page, designed a comprehensive profile page with features to update billing and shipping addresses, and created the 'About Us' page. Navigating and managing your account on Meowww is now smoother than ever.",
    githubLink: 'https://github.com/annaAzh',
    color: '#fdf0e4',
    images: [Anna, Anna2],
  },
  {
    name: 'Andrew',
    role: 'Head of Jest Testing and FSD Specialist',
    bio: "Andrew's journey into the pet world began with her own cat, Mr. Whiskers, who taught him the art of napping anywhere, anytime. With a degree in feline psychology and a minor in Feature-Sliced Design Architectural methodology, Andrew ensures that every cat product is tested and approved by Mr. Whiskers himself. His expertise lies in creating a feline-friendly environment that's as cozy as it is entertaining.",
    contribution:
      "Andrew's primary role is to curate the catalog at shop, making sure every toy, bed, and scratch post meets the highest standards of feline comfort and be placed in the write category. Try it out, they can  be searchable instantly. Also he is charge for simple process for log-in all our best friends to our amazing Meowww shop. His incredible contribution to create simple cart widgets was be marked all our customer's. In his free time he look at all component at  our app should be tested wright way.",
    githubLink: 'https://github.com/rRedq',
    color: '#C2D5B6',
    images: [Andrew, Andrew2],
  },
  {
    name: 'Irina',
    role: 'Chief of Products, Routes and Good Humor',
    bio: "Irina's love for animals began when she was a toddler, sneaking dog treats into her pockets and distributing them to every neighborhood pup. Now, as the CPO of Meowww, she brings her lifelong passion and extensive knowledge of pet care to the forefront. Irina is the brains behind the shop's comprehensive product range, ensuring every furry friend's needs are met. When she's not at work, you can find her at the dog park, attempting to break her record for the number of dogs she can get to sit at once (current record: 27).",
    contribution:
      "Irina oversees product selection and customer satisfaction, ensuring every item in the shop is of top-notch quality. Have you noticed how easy it is to navigate between shop pages? That's thanks to Irina's expertise. Have you tried adding some products to your cart? Not yet? Give it a try—whether it's pet food or a cat's toy, it will fly into your cart like a rocket!",
    githubLink: 'https://github.com/IrinaFileva',
    color: '#f8f2ff',
    images: [Irina, Irina2],
  },
];
