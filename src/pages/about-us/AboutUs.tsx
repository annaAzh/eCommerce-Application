import { FC, Suspense, lazy } from 'react';
import style from './AboutUs.module.css';
import { HashLoader } from 'react-spinners';
import img from 'shared/assets/img/aboutUsCat.png';
import imgLogo from 'shared/assets/img/rsLogo.webp';
import { Link } from 'react-router-dom';
import { aboutUs } from 'shared/consts';

const AboutUsDetails = lazy(() =>
  import('widgets/AboutUsDetails').then((module) => ({ default: module.AboutUsDetails })),
);

const RSSLink: FC = () => (
  <Link to="https://rs.school/" target="_blank">
    <img className={style.img} src={imgLogo} alt="RS logo"></img>
  </Link>
);

const AboutUsContent: FC = () => (
  <>
    {aboutUs.map((el, i) => (
      <AboutUsDetails key={i} {...el} />
    ))}
    <p className={style.text}>The Secret Sauce: Collaboration & Humor</p>
  </>
);

const AboutUsTop: FC = () => (
  <div className={style.container}>
    <div className={style.imgContainer}>
      <img className={style.aboutImg} src={img} alt="cat picture" />
      <div className={`${style.link} ${style.linkTop}`}>
        <RSSLink />
      </div>
      <div className={`${style.link} ${style.linkBottom}`}>
        <RSSLink />
      </div>
    </div>
    <div className={style.aboutContainer}>
      <h2 className={style.trioTitle}>Meet the Dynamic Trio Behind Meowww 🐾 Shop</h2>
      <p>
        Welcome to the behind-the-scenes peek at the three brilliant (and slightly quirky) minds responsible for Meowww
        Shop. This team of pet enthusiasts not only brought this purr-fect pet paradise to life but also managed to do
        so with a blend of new technologies for them, collaboration, and a hefty dose of humor. Let&apos;s introduce you
        to the masterminds:
      </p>
    </div>
  </div>
);

const Loader: FC = () => {
  return <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />;
};

export const AboutUs: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className={style.cover}>
        <div className={style.wrapper}>
          <h2 className={style.title}>About us</h2>
          <AboutUsTop />
          <AboutUsContent />
        </div>
      </div>
    </Suspense>
  );
};
