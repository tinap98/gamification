import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import javax.swing.*;

public class ImageExample {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Image Example");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 400);

        try {
            // Load the image
            BufferedImage img = ImageIO.read(new File("D:\gamification\the crash room.png"));
            JLabel label = new JLabel(new ImageIcon(img));

            // Add the image to the frame
            frame.add(label);
        } catch (IOException e) {
            System.out.println("Image not found or error loading image.");
            e.printStackTrace();
        }

        frame.setVisible(true);
    }
}
