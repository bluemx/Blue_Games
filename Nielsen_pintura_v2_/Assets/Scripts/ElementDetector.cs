using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ElementDetector : MonoBehaviour
{
    private float maxDistanceMultiplier = 2.4f; // Multiplier for the maximum distance (set to 1.0 by default)
    public LayerMask detectionLayer;

    private Collider2D myCollider; // Collider of the element
    private float maxDistance;

    private Collider2D[] colliders;
    
    private Collider2D[] colliders2;


    private Collider2D[] result;
    private ContactFilter2D filter;

    private void Start()
    {
        myCollider = GetComponent<Collider2D>(); // Get the collider of the element
        maxDistance = myCollider.bounds.size.x * maxDistanceMultiplier;

        DetectElements();

    }

    void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.white;
        Gizmos.DrawWireSphere((Vector2)transform.position, maxDistance);
        for (int i = 0; i < colliders.Length; i++)
        {
            Gizmos.color = Color.cyan;
            Gizmos.DrawWireSphere((Vector2)colliders[i].transform.position, 0.2f);
        }
/*
        for (int i = 0; i < result.Length; i++)
        {
            Gizmos.color = Color.magenta;
            Gizmos.DrawWireSphere((Vector2)colliders[i].transform.position, 0.15f);
        }
*/
    }

    public GameObject[] DetectElements()
    {


        /* FRST */
/*
        result = new Collider2D[10];
        filter = new ContactFilter2D();
        filter.useTriggers = true;
        int num = Physics2D.OverlapCircle((Vector2)gameObject.transform.position, 50f, filter , result);
*/ 
        /* SECOND */




        colliders = Physics2D.OverlapCircleAll(new Vector2(transform.position.x, transform.position.y), maxDistance, detectionLayer);
        


        GameObject[] gameObjects = new GameObject[colliders.Length];
        for (int i = 0; i < colliders.Length; i++)
        {
            gameObjects[i] = colliders[i].gameObject;
        }
        /*
        // Print the names of the detected game objects
        foreach (GameObject go in gameObjects)
        {
            //Debug.Log("Detected game object: " + go.name);
        }
        */
        return gameObjects; // Return the array of game objects
    }
}
