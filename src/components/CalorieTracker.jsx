import { useState, useEffect } from 'react';

const CalorieTracker = () => {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState(0);
  const [foods, setFoods] = useState(() => {
    const storedFoods = localStorage.getItem('foods');
    return storedFoods ? JSON.parse(storedFoods) : [];
  });

  // Save to local storage whenever foods changes
  useEffect(() => {
    localStorage.setItem('foods', JSON.stringify(foods));
  }, [foods]);

  // Delete Food
  const deleteFood = (index) => {
    const updatedFoods = foods.filter((_, i) => i !== index);
    setFoods(updatedFoods);
  };

  const logFood = () => {
    if (food && calories) {
      const newFood = { food, calories };
      setFoods([...foods, newFood]);
      setFood('');
      setCalories(0);
    }
  };

  return (
    <div>
      <h2>Calorie Tracker</h2>

      <input
        type="text"
        placeholder="Food Name"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />

      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(Number(e.target.value))}
      />

      <button onClick={logFood}>Log Food</button>

      <ul>
        {foods.map((entry, index) => (
          <li key={index}>
            {entry.food}: {entry.calories} calories
            <button onClick={() => deleteFood(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalorieTracker;
