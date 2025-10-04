//* Recuperar contraseña
export function generatePasswordResetEmail({
  resetLink,
}: {
  resetLink: string;
}) {
  return `
  <div style="font-family: Arial, sans-serif; color: #4b5563; max-width: 650px; margin: auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; font-size: 16px;">
    
    <!-- Logo -->
    <div style="background-color: #ffffff; padding: 20px; text-align: center;">
      <img src="https://res.cloudinary.com/majomon/image/upload/v1759158767/FotoNube/Imagenes%20para%20los%20Emails/logo-FOTONUBE-Mail-top---comun_a_todos_zvhcve.jpg" alt="FOTONUBE Logo" style="max-width: 140px;" />
    </div>

    <!-- Banner -->
    <div style="width: 100%; text-align: center;">
      <img src="https://res.cloudinary.com/majomon/image/upload/v1759158767/FotoNube/Imagenes%20para%20los%20Emails/banner-FOTONUBE-Mail_Recuperar_contrase%C3%B1a_c2t7vf.jpg" alt="Banner Recuperar Contraseña" style="width: 100%; height: auto; display: block;" />
    </div>

    <!-- Contenido -->
    <div style="padding: 25px 40px; background-color: #ffffff;">
      <h2 style="color: #0891b2; text-align: center; font-size: 26px; margin-bottom: 20px;">
        Recuperar contraseña
      </h2>

      <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 15px; text-align: justify;">
        Hola.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 15px; text-align: justify;">
        Has recibido este correo electrónico porque se efectuó una solicitud para recuperar la contraseña de tu usuario en <strong style="color:#0891b2;">FOTONUBE</strong>.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 20px; text-align: justify;">
        Si tú no lo pediste, puedes ignorar este mensaje.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 25px; text-align: justify;">
        En caso de querer continuar con el proceso de recuperación de contraseña, haz clic en el siguiente botón:
      </p>

      <!-- Botón CTA -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" 
           style="display: inline-block; padding: 12px 28px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px;">
           Recuperar contraseña
        </a>
      </div>

      <p style="font-size: 14px; color: #6b7280; margin-top: 20px; text-align: center;">
        Muchas gracias
      </p>
    </div>

    <!-- Footer -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; padding:20px; text-align:center; color:white;">
      <tr>
        <!-- Columna 1: Logo -->
        <td width="33%" align="center">
          <img src="https://res.cloudinary.com/majomon/image/upload/v1759158767/FotoNube/Imagenes%20para%20los%20Emails/logo-FOTONUBE-Mail-top---comun_a_todos_zvhcve.jpg" alt="Fotonube Logo" width="120" style="display:block; margin:auto;" />
        </td>

        <!-- Columna 2: Redes Sociales -->
        <td width="33%" align="center">
          <a href="https://instagram.com/fotonube" style="margin:0 6px; display:inline-block;">
            <img src="https://res.cloudinary.com/majomon/image/upload/v1759159253/FotoNube/Imagenes%20para%20los%20Emails/instagram_yax2vp.png" alt="Instagram" height="28" style="display:block;" />
          </a><a href="https://www.youtube.com/@fotonubeARG" style="margin:0 6px; display:inline-block;">
            <img src="https://res.cloudinary.com/majomon/image/upload/v1759159253/FotoNube/Imagenes%20para%20los%20Emails/youtube_v9e2aw.png" alt="YouTube" height="28" style="display:block;" />
          </a><a href="https://facebook.com/fotonube" style="margin:0 6px; display:inline-block;">
            <img src="https://res.cloudinary.com/majomon/image/upload/v1759159252/FotoNube/Imagenes%20para%20los%20Emails/facebook_dkr1jn.png" alt="Facebook" height="28" style="display:block;" />
          </a>
        </td>


        <!-- Columna 3: Link web -->
        <td width="33%" align="center" style="font-size:14px;">
          <a href="https://www.fotonube.com" style="color: #4b5563; text-decoration:none; font-weight:bold;">
            www.fotonube.com
          </a>
        </td>
      </tr>
    </table>
  </div>
  `;
}
