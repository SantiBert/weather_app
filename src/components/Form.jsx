import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Form = ({ search, setSearch, getCall }) => {

    const [error, setError] = useState(false);

    const { city, country } = search;

    const handleChange = e => {
        //actualizar state
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        //validar
        if (city.trim() === '' || country.trim() === '') {
            setError(true);
            return
        }

        setError(false);

        getCall(true);
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error message="Todos los campos son obligatorios" /> : null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={handleChange}
                />
                <label htmlFor="city">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select
                    name="country"
                    id="country"
                    value={country}
                    onChange={handleChange}
                >
                    <option value="">-- Seleciona un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>

            </div>
            <div className="input-field col s12">
                <input
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
    );
}
Form.propTypes = {
    search: PropTypes.object.isRequired,
    setSearch: PropTypes.func.isRequired,
    getCall: PropTypes.func.isRequired,
}
export default Form;