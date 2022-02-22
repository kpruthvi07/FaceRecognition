import cv2
import face_recognition

def capture():
    cap = cv2.VideoCapture(0)
    while(True):  
        ret, img = cap.read()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        cv2.imshow('image',img)
        if cv2.waitKey(1) & 0xff==ord('q'):
            name='current.jpg'
            img_new=cv2.imwrite(name,img)
            cv2.imshow('image',img_new)
            break

    cap.release() 
    cv2.destroyAllWindows()


