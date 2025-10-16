//* Fotografos - Email de bienvenida
export function generatePhotographerWelcomeEmail() {
  return `
  <div style="font-family: Arial, sans-serif; color: #4b5563; max-width: 650px; margin: auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; font-size: 16px;">
    
    <!-- Logo -->
    <div style="background-color: #ffffff; padding: 20px; text-align: center;">
      <img src="https://res.cloudinary.com/majomon/image/upload/v1759158767/FotoNube/Imagenes%20para%20los%20Emails/logo-FOTONUBE-Mail-top---comun_a_todos_zvhcve.jpg" alt="FOTONUBE Logo" style="max-width: 140px;" />
    </div>

    <!-- Banner -->
    <div style="width: 100%; text-align: center;">
      <img src="https://res.cloudinary.com/majomon/image/upload/v1759158767/FotoNube/Imagenes%20para%20los%20Emails/banner-FOTONUBE-Mail_Bienvenida_Fotografos_Free_arvzud.jpg" alt="Banner Bienvenida Fotógrafos" style="width: 100%; height: auto; display: block;" />
    </div>

    <div style="padding: 25px 40px; background-color: #ffffff;">
      <h2 style="color: #0891b2; text-align: center; font-size: 28px; margin-bottom: 5px;">
        Bienvenido a FOTONUBE
      </h2>
      <p style="font-size: 18px; line-height: 1.6; color: #4b5563; text-align: center; margin-top: 0; margin-bottom: 25px;">
        Lleva tu negocio fotográfico al siguiente nivel.
      </p>

      <p style="font-size: 16px; line-height: 1.6; color: #4b5563; text-align: justify; margin-bottom: 15px;">
        Estás suscripto a <strong style="color: #0891b2;">FOTONUBE Free</strong>. ¡Sí! Puedes usar la plataforma de forma <strong style="color: #0891b2;">gratuita</strong>. Recuerda que cuentas con <strong>1GB de espacio</strong> en la nube y puedes crear solo <strong>1 álbum</strong> para comercializar tus fotos.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563; text-align: justify;">
        Ten presente que FOTONUBE Free cobra, en concepto de comisión por ventas, el <strong>19,99%</strong> del total de cada transacción concretada.
      </p>

      <!-- Botón de Crear Álbum -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 30px auto;">
        <tr>
          <td align="center" style="font-weight: bold; font-size: 15px; color: #000000; padding-right: 10px;">
            ¡Comienza ahora!
          </td>
          <td align="center">
            <a
              href="https://next-foto-nube.vercel.app"
              style="display: inline-block; padding: 12px 28px; background-color: #ffffff; color: #06b6d4; border: 1px solid #06b6d4; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px;"
            >
              Crear álbum
            </a>
          </td>
        </tr>
      </table>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

      <!-- Links a videos tutoriales -->
      <div style="text-align: center;">
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 15px;">
          Mira nuestros <strong>videos tutoriales</strong> para aprender a usar FOTONUBE:
        </p>
        <p style="margin: 0;">
          <a href="https://www.youtube.com/watch?v=UCGHdAPNJII&ab_channel=FOTONUBE" target="_blank" style="color: #06b6d4; text-decoration: none;">Cómo crear tu primer álbum</a><br/>
          <a href="https://www.youtube.com/watch?v=5H_wPKo5ik0&ab_channel=FOTONUBE" target="_blank" style="color: #06b6d4; text-decoration: none;">Cómo vender tus fotos fácilmente</a><br/>
          <a href="https://www.youtube.com/watch?v=dEVcXISixTQ&ab_channel=FOTONUBE" target="_blank" style="color: #06b6d4; text-decoration: none;">Consejos para potenciar tus ventas</a>
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px; background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 20px;">
          ¿Quieres más espacio en la nube para crear más álbumes?
        </p>
        <a href="https://next-foto-nube.vercel.app"
           style="display: inline-block; padding: 12px 28px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px;">
           Suscríbete a FOTONUBE Pro
        </a>
      </div>
    </div>

    <!-- Footer -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; padding:20px; text-align:center;">
      <tr>
        <td width="33%" align="center">
          <img src="https://res.cloudinary.com/majomon/image/upload/v1759158767/FotoNube/Imagenes%20para%20los%20Emails/logo-FOTONUBE-Mail-top---comun_a_todos_zvhcve.jpg" alt="Fotonube Logo" width="120" style="display:block; margin:auto;" />
        </td>

        <td width="33%" align="center">
          <a href="https://instagram.com/fotonube" style="margin:0 6px;">
            <img src="https://res.cloudinary.com/majomon/image/upload/v1759159253/FotoNube/Imagenes%20para%20los%20Emails/instagram_yax2vp.png" alt="Instagram" height="28" />
          </a>
          <a href="https://www.youtube.com/@fotonubeARG" style="margin:0 6px;">
            <img src="https://res.cloudinary.com/majomon/image/upload/v1759159253/FotoNube/Imagenes%20para%20los%20Emails/youtube_v9e2aw.png" alt="YouTube" height="28" />
          </a>
          <a href="https://facebook.com/fotonube" style="margin:0 6px;">
            <img src="https://res.cloudinary.com/majomon/image/upload/v1759159252/FotoNube/Imagenes%20para%20los%20Emails/facebook_dkr1jn.png" alt="Facebook" height="28" />
          </a>
        </td>

        <td width="33%" align="center" style="font-size:14px;">
          <a href="https://www.fotonube.com" style="color: #4b5563; text-decoration:none; font-weight:bold;">
            https://next-foto-nube.vercel.app
          </a>
        </td>
      </tr>
    </table>

  </div>
  `;
}

//* Compradores - Email de bienvenida
export function generateBuyerWelcomeEmail() {
  return `
  <div style="font-family: Arial, sans-serif; color: #4b5563; max-width: 650px; margin: auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; font-size: 16px;">
    
     <!-- Logo -->
    <div style="background-color: #ffffff; padding: 20px; text-align: center;">
      <img src="https://res.cloudinary.com/majomon/image/upload/v1759158767/FotoNube/Imagenes%20para%20los%20Emails/logo-FOTONUBE-Mail-top---comun_a_todos_zvhcve.jpg" alt="FOTONUBE Logo" style="max-width: 140px;" />
    </div>

    <!-- Banner -->
    <div style="width: 100%; text-align: center;">
      <img src="https://res.cloudinary.com/majomon/image/upload/v1759158767/FotoNube/Imagenes%20para%20los%20Emails/banner-FOTONUBE-Mail_Bienvenida_Compradores_oe4imx.jpg" alt="Banner Recuperar Contraseña" style="width: 100%; height: auto; display: block;" />
    </div>

    <!-- Contenido -->
    <div style="padding: 25px 40px; background-color: #ffffff;">
      <h2 style="color: #0891b2; text-align: center; font-size: 28px; margin-bottom: 5px;">
        Bienvenido a FOTONUBE
      </h2>
      <p style="font-size: 18px; line-height: 1.6; color: #4b5563; text-align: center; margin-top: 0; margin-bottom: 25px; font-weight: bold;">
        Compra en línea tus fotos favoritas
      </p>

      <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 15px; text-align: justify;">
        Rememora en <strong style="color:#0891b2;">FOTONUBE</strong> esos momentos únicos e inolvidables. Ingresa usuario y contraseña (que te entregó el fotógrafo) y accede al álbum de fotos del evento al cual asististe.
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563; text-align: justify;">
        Elige las fotos que más te gusten, selecciona el tamaño y/o formato, págaselas en línea.
      </p>

      <!-- Botón CTA -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://next-foto-nube.vercel.app"
           style="display: inline-block; padding: 12px 28px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px;">
           Ingresar a un álbum
        </a>
      </div>
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
          <a href="https://next-foto-nube.vercel.app" style="color: #4b5563; text-decoration:none; font-weight:bold;">
            www.fotonube.com
          </a>
        </td>
      </tr>
    </table>
  </div>
  `;
}
