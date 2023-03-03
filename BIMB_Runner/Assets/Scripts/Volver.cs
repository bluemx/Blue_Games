using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Volver : MonoBehaviour
{
    public Animator cubeta;
   public void Fondo()
    {
        GetComponent<Animator>().Play("Idle");
        cubeta.GetComponent<Animator>().Play("Idle");
    }
}
