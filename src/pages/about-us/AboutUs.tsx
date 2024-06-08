import { FC, useEffect, useState } from 'react';
import style from './AboutUs.module.css';
import { AboutUsDetails } from 'widgets/AboutUsDetails';
import { HashLoader } from 'react-spinners';
import img from 'shared/assets/img/aboutUsCat.png';
import imgLogo from 'shared/assets/img/rsLogo.webp';
import { Link } from 'react-router-dom';
import { aboutUs } from 'shared/consts';

export const AboutUs: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />;
  }

  return (
    <>
      <div className={style.cover}>
        <div className={style.wrapper}>
          <h2 className={style.title}>About us</h2>
          <div className={style.container}>
            <div className={style.imgContainer}>
              <img className={style.aboutImg} src={img} alt="cat picture" />
              <div className={`${style.link} ${style.linkTop}`}>
                <Link to="https://rs.school/" target="_blank">
                  <img className={style.img} src={imgLogo} alt="RS logo"></img>
                </Link>
              </div>
              <div className={`${style.link} ${style.linkBottom}`}>
                <Link to="https://rs.school/" target="_blank">
                  <img className={style.img} src={imgLogo} alt="RS logo"></img>
                </Link>
              </div>
            </div>
            <div className={style.aboutContainer}>
              <h2 className={style.trioTitle}>Meet the Dynamic Trio Behind Meowww 🐾 Shop</h2>
              <p>
                Welcome to the behind-the-scenes peek at the three brilliant (and slightly quirky) minds responsible for
                Meowww Shop. This team of pet enthusiasts not only brought this purr-fect pet paradise to life but also
                managed to do so with a blend of new techologies for them, collaboration, and a hefty dose of humor.
                Let&apos;s introduce you to the masterminds:
              </p>
            </div>
          </div>

          <>
            {aboutUs.map((el, i) => (
              <AboutUsDetails key={i} {...el} />
            ))}
          </>
          <p className={style.text}>The Secret Sauce: Collaboration & Humor</p>
        </div>
      </div>
    </>
  );
};
