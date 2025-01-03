import { supabase } from "#config/supabase.config.js";

class UserController {
  #userService;
  #userRepository
  constructor({ userService, userRepository }) {
    this.#userService = userService;
    this.#userRepository = userRepository
  }
  async register(req, res) {
    try {
      const payload = req.body;
      const user = await this.#userService.register(payload);

      if (user.success) {
        return res.status(201).json(user);
      } else {
        return res.status(400).json(user);
      }
    } catch (error) {
      console.error("Error in UserController.resiger: ", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async login(req, res) {
    try {
      const payload = req.body;
      const user = await this.#userService.login(payload);

      if (user.success) {
        res.cookie("userToken", user.token)
        return res.status(200).json(user);
      } else {
        return res.status(401).json(user);
      }
    } catch (error) {
      console.error("Error in UserController.login: ", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async logout(req, res) {
    try {
      const result = await this.#userService.logout(res);
      console.log(result);
      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.log("Error during the logout", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server error" });
    }
  }

  async profile(req, res) {
    try {
      const user = await this.#userService.profile(req);

      if (user.success) {
        return res.status(200).json(user)
      } else {
        return res.status(404).json({ user })
      }
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: "Internal server error" })
    }

  }

  async update(req, res) {
    try {

      let isPhoto;

      const user = await this.#userRepository.getUserByEmail(req.body.email);

      console.log(req.file,"available")

      if (req.file) {
        const { buffer, originalname, mimetype } = req.file;
  
        const fileName = `${Date.now()}-${originalname}`;

       

        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" })
        }

        if (user.photo) {
          const filepath = user?.photo.split("/").slice(-2).join("/")
          const fullFIlePath = `images/${filepath}`
          const { error } = await supabase.storage.from("react-login-user-images").remove([fullFIlePath])

          if (error) {
            console.error("Failed to delete old file: ", error.message)
            console.log(error)
            return res.status(500).json({ success: false, message: "Failed to delete old file" })
          }
        }

        const { data, error } = await supabase.storage
          .from("react-login-user-images")
          .upload(`images/${fileName}`, buffer, { contentType: mimetype });

          console.log(data,"supabase data")

        if (error) {
          console.log(error)
          throw new Error("Failed to upload file to Supabase"); 
        }

        const { data:{publicUrl} } = supabase.storage
          .from("react-login-user-images")
          .getPublicUrl(data.path);

          console.log(publicUrl,"== supabase publicUrl")

          isPhoto = publicUrl;
      }
 
      req.body.photo = isPhoto || req.body.photo                                                                             

      const update = await this.#userService.update(user._id, req.body);

      if (update.success) {
        return res.status(200).json(update);
      } else {
        return res.status(400).json(update);
      }
    } catch (error) {
      console.error(error.message);
      console.log(error)
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { UserController }