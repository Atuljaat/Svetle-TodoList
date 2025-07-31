
export const load = async ({locals}) => {
  return { 
    isLoggedIn : locals.session ? true : false,
  }; 
};
