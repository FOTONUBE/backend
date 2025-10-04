export function generatePurchaseConfirmationEmail(
  orderId: string,
  total: string,
  itemCount: number,
) {
  return `
  <div style="font-family: Arial, sans-serif; color: #4b5563; max-width: 650px; margin: auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; font-size: 16px;">
    
    <!-- Logo -->
    <div style="background-color: #ffffff; padding: 20px; text-align: center;">
      <img src="https://res.cloudinary.com/majomon/image/upload/v1759158767/FotoNube/Imagenes%20para%20los%20Emails/logo-FOTONUBE-Mail-top---comun_a_todos_zvhcve.jpg" alt="FOTONUBE Logo" style="max-width: 140px;" />
    </div>

    <!-- Banner -->
    <div style="width: 100%; text-align: center;">
      <img src="https://res.cloudinary.com/majomon/image/upload/v1759158767/FotoNube/Imagenes%20para%20los%20Emails/banner-FOTONUBE-Mail_Bienvenida_Compradores_oe4imx.jpg" alt="Compra confirmada" style="width: 100%; height: auto; display: block;" />
    </div>

    <!-- Contenido -->
    <div style="padding: 25px 40px; background-color: #ffffff;">
      <h2 style="color: #0891b2; text-align: center; font-size: 26px; margin-bottom: 10px;">
        ¡Gracias por tu compra!
      </h2>
      <p style="font-size: 17px; line-height: 1.6; color: #4b5563; text-align: center; margin-bottom: 25px;">
        Tu pedido ha sido procesado exitosamente.
      </p>

      <!-- Resumen breve -->
      <div style="background:#f9fafb; padding:15px; border-radius:8px; margin-bottom:25px;">
        <p><strong>Número de orden:</strong> ${orderId}</p>
        <p><strong>Cantidad de fotos:</strong> ${itemCount}</p>
        <p><strong>Total pagado:</strong> ${total}</p>
      </div>

      <!-- Botón CTA -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://next-foto-nube.vercel.app/ashboard/pedidos/${orderId}" 
           style="display: inline-block; padding: 12px 28px; background-color: #06b6d4; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px;">
           Ver mi orden completa
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
          </a>
          <a href="https://www.youtube.com/@fotonubeARG" style="margin:0 6px; display:inline-block;">
            <img src="https://res.cloudinary.com/majomon/image/upload/v1759159253/FotoNube/Imagenes%20para%20los%20Emails/youtube_v9e2aw.png" alt="YouTube" height="28" style="display:block;" />
          </a>
          <a href="https://facebook.com/fotonube" style="margin:0 6px; display:inline-block;">
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
