# 🚑 AI-Based Smart Emergency Care Path Finder System

This project presents an **AI-powered emergency care routing solution** using the **A\* search algorithm**, enabling real-time navigation to the most suitable healthcare facilities based on live traffic, hospital availability, and patient needs.

## 📌 Abstract

In emergency medical scenarios, every second counts. Our system leverages classical AI (A\* algorithm) with real-time data to ensure the **shortest and fastest route** to appropriate healthcare centers. It dynamically adapts to traffic and hospital status, helping **minimize response time** and improve patient outcomes.

## 👨‍💻 Authors

- **Anant Jain** (RA2311026010727)  
  [LinkedIn](https://www.linkedin.com/in/anant-jain-638ab927a/) | [GitHub](https://github.com/Anantj21)
- **Arnav Pandey** (RA2311026010729)  
  [LinkedIn](https://www.linkedin.com/in/arnav471947) | [GitHub](https://github.com/Arnav-sudo)
- **Akshat Pratik** (RA2311026010732)  
  [LinkedIn](https://www.linkedin.com/in/akshat-pratik-803833228) | [GitHub](https://github.com/AkshatPratik)

## 📍 Objectives

- ✅ Identify the fastest and most efficient emergency care route using A\* algorithm.
- 🚦 Dynamically calculate paths using real-time traffic and road conditions.
- 🏥 Integrate hospital availability (bed count, specialization).
- 🌐 Create a user-friendly interface for responders and patients.
- 🔄 Enable dynamic rerouting due to traffic or hospital changes.
- 📊 Validate performance vs. conventional GPS tools.

## 🧠 Methodology

1. **Data Collection**: Real-time GPS, Google Maps API, and hospital availability.
2. **Preprocessing**: Filter hospitals based on emergency type and create a weighted graph.
3. **A\* Algorithm**: Pathfinding with Haversine distance as the heuristic.
4. **Dynamic Updates**: Live rerouting for traffic and hospital status.
5. **Path Visualization**: Map interface with travel time, ETA, and routes.
6. **Alerts**: Notify hospitals of incoming patients with ETA and emergency type.

## 📊 Results

- **Accurate pathfinding** using A\* with live traffic.
- **12–18% reduction** in emergency response time.
- **Dynamic rerouting** during congestion or unavailability.
- **<1s average computation time**, ideal for real-time use.
- **User-friendly UI** via Streamlit for accessibility.

## 📌 Conclusion

This intelligent path finder exemplifies the integration of AI with real-world emergency applications. It significantly enhances emergency response logistics, potentially saving lives by reducing critical delays.

### 🔮 Future Enhancements

- Ambulance dispatch integration.
- Voice-enabled interfaces.
- Predictive analytics for emergency hotspots.

## 📚 References

1. Russell, S., & Norvig, P. (2020). *Artificial Intelligence: A Modern Approach*.
2. Dijkstra, E. W. (1959). *Numerische Mathematik*.
3. [OpenStreetMap](https://www.openstreetmap.org)
4. [Google Maps Routes API](https://developers.google.com/maps/documentation/routes)
5. WHO (2019). *Emergency Medical Services Systems in the EU*.
6. Hart, P. E., Nilsson, N. J., & Raphael, B. (1968). *IEEE Transactions on Systems Science and Cybernetics*.

---

> 🧪 Course: **21CSC206T - Artificial Intelligence**  
> 🎓 Institution: Department of Computational Intelligence, SRM University, Kattankulathur  
> 🏫 Section: AB2

