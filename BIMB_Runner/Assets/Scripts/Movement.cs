using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Movement : MonoBehaviour
{
  
    float horizontal;

    [SerializeField] Rigidbody2D rigid;

    [SerializeField] float velocidad, deltaX;
    [SerializeField] Camera cam, segunda;

    [SerializeField] GameObject pause;
    Vector2 mousePos;

    Vector3 v3;

    Transform toDrag;
   

    bool dragging;
    Vector3 offset;

    public bool drag;


    // Start is called before the first frame update
    void Start()
    {
        //if (SystemInfo.deviceType == DeviceType.Desktop)
        //{
        //    pc = true;
        //    mobile = false;
        //}
        //else if (SystemInfo.deviceType == DeviceType.Handheld)
        //{
        //    mobile = true;
        //    pc = false;
        //}
    }

    // Update is called once per frame
    void Update()
    {
        CubetaMove();
    }


    private void OnMouseDown()
    {
        deltaX = cam.ScreenToWorldPoint(Input.mousePosition).x - transform.position.x;
        drag = true;

        //if (pc)
        //{
            
        //}
    }

    private void OnMouseDrag()
    {
       if(drag)
        {
            mousePos = cam.ScreenToWorldPoint(Input.mousePosition);

            if(mousePos.x-deltaX<=2&&mousePos.x-deltaX>=-2)
                transform.position = new Vector2(mousePos.x - deltaX, transform.position.y);

            Debug.Log(mousePos.x-deltaX);
           
        }
    }

    private void OnMouseUp()
    {
        drag = false;
    }

    void CubetaMove()
    {
        //if(pc)
        //{

           
            

        //}
        //else if(mobile)
        //{

        //}


        horizontal = Input.GetAxis("Horizontal");
        rigid.velocity = new Vector2(horizontal * velocidad, rigid.velocity.y);



        if (Input.GetMouseButton(0))
        {
            Debug.Log("a");
            Vector3 mousePos = cam.ScreenToWorldPoint(Input.mousePosition);
            Vector2 mousePos2D = new Vector2(mousePos.x, mousePos.y);

            RaycastHit2D hit = Physics2D.Raycast(mousePos2D, Vector2.zero);





            if (hit.collider != null && !pause.activeInHierarchy)
            {
                Debug.Log(hit.collider.name);
                //Debug.Log(hit_.collider.name);

                if (hit.collider.name == "Fondo" && !pause.activeInHierarchy)
                {
                    transform.position = Vector2.MoveTowards(new Vector2(transform.position.x, transform.position.y), new Vector2(mousePos2D.x, transform.position.y), velocidad*Time.deltaTime);
                    //transform.Translate(new Vector3(mousePos2D.x, transform.position.y, transform.position.z));
                }
            }
        }

        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            Vector3 pos = touch.position;
            switch (touch.phase)
            {
                case TouchPhase.Began:
                    {
                        Ray ray = Camera.main.ScreenPointToRay(pos);
                        RaycastHit hit;
                        //Vector3 pos = touch.position;
                        if (Physics.Raycast(ray, out hit))
                        {
                            toDrag = hit.transform;
                            v3 = new Vector3(pos.x, transform.position.y, transform.position.z);
                            v3 = Camera.main.ScreenToWorldPoint(v3);
                            offset = toDrag.position - v3;
                            dragging = true;

                        }



                        break;
                    }
                case TouchPhase.Moved:
                    {

                        if (dragging)
                        {
                            v3 = new Vector3(Input.mousePosition.x, transform.position.y, transform.position.z);
                            v3 = Camera.main.ScreenToWorldPoint(v3);
                            toDrag.position = v3 + offset;
                        }
                        //rigid.velocity = new Vector2( touch.deltaPosition.x * velocidad, rigid.velocity.y);
                        break;
                    }
                case TouchPhase.Ended:
                    {
                        if (dragging)
                            dragging = false;
                        break;
                    }
                case TouchPhase.Canceled:
                    {
                        if (dragging)
                            dragging = false;
                        break;
                    }

            }

        }
        else
            dragging = false;
    }


   

}
