import { useRef, useState } from 'react';
import './SearchPanel.css';

// import axios, { AxiosResponse } from 'axios';
import axios from 'axios';

// import search from '../../assets/icons/search.svg';
import search_light from '../../assets/icons/search_light.svg';
import { UserBlockInterface } from '../../helpers/interfaces';
import UserBlock from '../UserBlock/UserBlock';

const SearchPanel = () => {

    let results : UserBlockInterface [] = [];
    const [searchResults, setSearchResults] = useState<UserBlockInterface []>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [searchValue, setSearchValue] = useState<string>('');

    const searchBar = useRef<HTMLInputElement>(null);

    const handleInput = () => {

        if (!searchBar || !searchBar.current) return;

        const value = searchBar.current.value;


        if (value.length === 0) {
            // setTimeout(() => {
            // }, 200);
            setSearchValue(value);
            return;
        }


        setLoading(true);
        getUsersByUsername(value);

        setSearchValue(value);
    }

    const getUsersByUsername = (username : string) => {

        axios.get('http://localhost:6969/api/user/search/' + username, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((res : any) => {

            setSearchResults(res.data);

            setTimeout(() => {
                setLoading(false);
            }, 300);

        }).catch((error) => {
            console.log(error.message);
        });

    }


    return (
        <div id='search-panel' className={( searchValue.length > 0 ? 'open' : '')}>

            <div id='search-bar'>
                <input className='main icon' type="text" placeholder='Search players' ref={ searchBar } onInput={ handleInput } />
                <img src={ search_light } alt="" />
            </div>

            <hr className='no-margin small' />

            <div id='search-results-container' className='hidden-scrollbar'>

                { loading && (
                    <div className='loader'>
                        <div className='spinner'></div>
                    </div>
                )}

                { !loading && searchResults.map((user : UserBlockInterface, index : number) => {
                    return (
                        // <div key={ index }>{ user.username }</div>
                        <UserBlock key={ index } user={ user } />
                    );
                })}

                {!loading && searchResults.length === 0 && (
                    <div className='not-found'>404 NOT FOUND</div>
                )}

            </div>

        </div>
    );

}

export default SearchPanel;