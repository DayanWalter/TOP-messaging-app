import { useState } from 'react';
import styles from './SearchSite.module.css';
import Site from './Site';
import Button from '../Button';
import Input from '../Input';
import DataFetch from '../DataFetch';

export default function SearchSite() {
  const [searchText, setSearchText] = useState('');

  const [dataFetchActive, setDataFetchActive] = useState(false);

  const handleGetData = (e) => {
    e.preventDefault();
    setDataFetchActive(true);
  };

  return (
    <>
      <Site>
        <header className={styles.header}></header>
        <main className={styles.main}>
          <form className={styles.form} onSubmit={handleGetData}>
            <Input
              type={'text'}
              placeholder={'Enter Username e.g.'}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />

            <Button text={'Search'} />
          </form>

          <div className={styles.container}>
            <p>User:</p>

            <DataFetch
              url={`http://localhost:3000/api/users?username=${encodeURIComponent(
                searchText
              )}`}
              isActive={dataFetchActive}
              type={'user'}
            />
          </div>
          <div className={styles.container}>
            <p>Groups:</p>

            <DataFetch
              url={`http://localhost:3000/api/groups?groupname=${encodeURIComponent(
                searchText
              )}`}
              isActive={dataFetchActive}
              type={'group'}
            />
          </div>
        </main>
        <footer className={styles.footer}></footer>
      </Site>
    </>
  );
}
