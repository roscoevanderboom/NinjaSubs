import moment from 'moment';
import { noUserImage, add_to_array } from '../../../constants'

export const verifyData = (post) => {
    let errors = [];
    let result = true
    if (post.location === ''
        || post.contact === ''
        || post.address === ''
        || post.image === noUserImage
        || post.phone === '') {
        let txt = 'Complete user profile';
        add_to_array(errors, txt);
    }
    if (post.start === '' || post.end === ''
        || moment(post.end).isBefore(post.start)) {
        let txt = 'Specify dates correctly';
        add_to_array(errors, txt);
    }
    if (post.rates === '') {
        let txt = 'Specify hourly rates';
        add_to_array(errors, txt);
    }
    if (post.comments === '') {
        let txt = 'Add some details about the job';
        add_to_array(errors, txt);
    }

    return { result, errors };
}