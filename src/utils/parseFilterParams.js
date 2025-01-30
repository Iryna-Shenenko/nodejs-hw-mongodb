

const parseIsFav = (isFavourite) => {
    const isString = typeof isFavourite === 'string';
    if(!isString) return;

    const value = isFavourite.toLowerCase();
    if(value === 'true') {
        return true;
    }else if ( value === 'false') {
        return false;
    }
};

const parseType = (contactType) => {
    const isString = typeof contactType === 'string';
   if (!isString)  return;
   const isType = (contactType) => ['work', 'home', 'personal'].includes(contactType);

   if (isType(contactType)) return contactType;
};

export const parseFilterParams = (query) => {
    const { isFavourite, contactType} = query;

    const parsedIsFav = parseIsFav(isFavourite);
    const parsedType = parseType(contactType);

    return {
        isFavourite: parsedIsFav,
        contactType: parsedType,
    };
};
