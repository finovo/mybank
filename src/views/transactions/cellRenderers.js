import moment from 'moment';

export const dateRenderer = timestamp => moment(timestamp).format('ddd, hA')