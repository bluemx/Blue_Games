using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
public class SobreMi : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{

    public static SobreMi instancia;

    public bool pausando=false;

    void Awake()
    {
        if (SobreMi.instancia == null)
        {
            SobreMi.instancia = this;
        }
        else
            Destroy(this.gameObject);
    }

    public void OnPointerEnter(PointerEventData eventData)
    {
        pausando = true;
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        pausando = false;
    }
}
