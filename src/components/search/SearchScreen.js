import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { useLocation } from 'react-router';
import { getHeroesByName } from '../../selectors/getHeroesByName';



export const SearchScreen = ({history}) => {
    
    const location = useLocation();
    //saca el query de la url y si es undefined imprime un string vacio
    const { q = '' } = queryString.parse( location.search );

    
    const [formValues, handleInputChange] = useForm({
        searchText: q
    });
    
    const {searchText} = formValues;

    const heroesFiltred = useMemo(() => getHeroesByName(q), [q])
    
    // const  heroesFiltred = getHeroesByName( searchText );

    const handleSearch = (e) => {
        e.preventDefault();
       history.push(`?q=${searchText}`);

    }
  


    return (
        <div>
            <h1>Search Screen</h1>
            <hr />
        <div className="row">
            <div className="col-5">
                <h4>Search Form</h4>
                <hr />
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Find your hero"
                        className="form-control"  
                        autoComplete="off" 
                        name ="searchText"
                        value= {searchText}
                        onChange= {handleInputChange}          
                    />
                    <button
                        type="submit"
                        className="btn m-1 btn-block btn-outline-primary"    
                    >
                        Search...
                    </button>
                </form>
            </div>
            <div className="col-7">
                <h4>Results</h4>
                <hr />

                {
                    (q === '') && <div className="alert alert-info">
                        Search a hero
                    </div>
                }

{
                    (q !== '' && heroesFiltred.length === 0)
                         && <div className="alert alert-danger">
                        There is no a hero with "{q}"
                    </div>
                }

                {
                    heroesFiltred.map( hero => (
                        <HeroCard
                            key={hero.id}
                            {...hero}
                        />
                    ))
                }
            </div>
            
        </div>
        </div>
        
    )
}
