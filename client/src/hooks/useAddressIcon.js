import { useMemo } from 'react';
import Jazzicon from '@metamask/jazzicon';

function useAddressIcon(address, size) {
    return useMemo(() => Jazzicon(size, parseInt(
        address.slice(2, 10), 16,
    )), [address, size]);
}

export default useAddressIcon;
