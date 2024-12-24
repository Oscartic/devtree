import bcrypt from 'bcrypt';


export const hasHashedPassword = async (password : string) => {
  try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log('[utils]', error)
  }
}

export const comparePassword = async (password: string, hashedPassword: string) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log('[utils]', error)
  }
}