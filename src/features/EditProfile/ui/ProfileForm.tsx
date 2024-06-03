import styles from './ProfileForm.module.css';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';
import { HashLoader } from 'react-spinners';
import { getProfileData, getProfileDataIsLoading } from '../model/selectors/profileSelectors';
import { Abs } from './asd/asd';
import { getAccessToken } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks';
import { getUserProfile } from '../model/services/getUserProfile';
import { updateUserAddress } from '../model/services/updateAddressProfile';
import { UpdateAddressParams } from '../model/types/profileTypes';

const ProfileForm: FC = () => {
  const isLoading = useAppSelector(getProfileDataIsLoading);
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const { addresses } = useAppSelector(getProfileData);
  const { version } = useAppSelector(getProfileData);
  const [callstack, setCallstack] = useState<UpdateAddressParams[]>([]);

  useEffect(() => {
    if (!token) return;
    dispatch(getUserProfile(token));
  }, [token]);

  const handler = (data: UpdateAddressParams) => {
    if (!token || !version) return;
    const req2 = { ...data, city: 'new one' };
    const req3 = { ...data, city: 'new req3' };
    const req4 = { ...data, city: 'another req4' };
    const req5 = { ...data, city: 'another req5' };
    setCallstack((prev) => [...prev, req2, req3, req4, req5]);
    dispatch(updateUserAddress(data));
  };

  useEffect(() => {
    if (callstack.length === 0) return;
    console.log(callstack);
    console.log(version);
    dispatch(updateUserAddress({ ...callstack[0], version }));
    setCallstack((prev) => [...prev.slice(1)]);
  }, [version]);

  const memoComponent = useMemo(() => {
    if (addresses?.length === 0) return;

    return <>{addresses?.map((adress, index) => <Abs handler={handler} key={index} adress={adress} />)}</>;
  }, [addresses]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />
      ) : (
        <>
          <h2 className={styles.title}>Profile</h2>
          {memoComponent}
          {/* {addresses?.map((adress, index) => <Abs key={index} adress={adress} />)} */}
        </>
      )}
    </div>
  );
};

export { ProfileForm };
