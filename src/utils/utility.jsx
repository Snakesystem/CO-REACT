import { lazy } from 'react'
import { LifeLine } from 'react-loading-indicators';
import Skeleton from 'react-loading-skeleton';
import ErrorBoundary from '../components/template/slice/ErrorBoundary';

// INPUT VALUDATION REGEX
export const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
export const pawdRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
// export const phoneRegExp = /^\d{9,13}$/;

// Convert camelCase to camel Case 
export const convertLabel = (str) => {
    return str.replace(/([A-Z])/g, ' $1').trim();
};

// ERROR MESSAGE FORM
export const ErrorMessage = ({ ngModel, errors }) => {
    const error = errors[ngModel];

    if (!error) {
        return null;
    }

    return <div className="invalid-feedback">{error.message}</div>
};

// LOADER PAGE
export default function MPCLoader() {
  return ( 
    <div className="mpc-loader">
        <div className="item-loader">
            <h2>Page Loading</h2>
            <LifeLine cla color="#17c1e8" size="large" text="Loading content, please wait..." textColor="#ffffff" />
        </div>
    </div>
  )
}

// LOADING SKELETON TO FIELD
export function LoadingSkeleton(props) {
    const { count } = props
    return (
        <Skeleton height={30} count={count}/>
    )
}

// OTHER LAZY LOAD
export function LazyLoad(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 300);
    }).then(() => promise);
}

// LAZY LOAD TO COMPONENT
export function lazyLoadComponents(path) {
    return lazy(() => {
        const promise = LazyLoad(path)
        if(path == null) {
            return <ErrorBoundary fallback="Please input module"/>;
        } else {
            return promise
        }
    })
}

// CREATE OPTIONS FUNCTION SELECT DYNAMIC
export const createOptions = (data, key, value) => {
    return data && data.map((item) => {
        return {
            optionKey: item[key],
            optionValue: item[value]
        }
    })
}

export const getFormatPhoneId = (value) => {

    let data = value; // Replace with actual API call
    
    if (data) {
        const phoneNumber = data.split('+62-')[1];
        return data = phoneNumber;
    }

    return data
}

export const createFormatPhoneId = (value) => {

    let data = value; // Replace with actual API call
    if(data) {
        const phoneNumber = `+62-${data}`;
        return data = phoneNumber;
    }

    return data
}
