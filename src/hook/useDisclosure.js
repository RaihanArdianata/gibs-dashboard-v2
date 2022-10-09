import React from 'react';

function useDisclosure() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return {
        open,
        handleOpen,
        handleClose
    };
}

export default useDisclosure;