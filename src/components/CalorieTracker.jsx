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
  const deleteFood = (id) => {
    const updatedFoods = foods.filter((item) => item.id !== id);
    setFoods(updatedFoods);
  };

  const logFood = () => {
    if (food.trim() && calories > 0 && calories <= 5000) {
      const newFood = { id: Date.now(), food: food.trim(), calories };
      setFoods([...foods, newFood]);
      setFood('');
      setCalories(0);
    }
  };

  const handleCaloriesChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setCalories(value);
    }
  };

  const clearAll = () => {
    localStorage.removeItem('foods');
    setFoods([]);
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
        value={calories || ''}
        onChange={handleCaloriesChange}
      />

      <button onClick={logFood}>Log Food</button>

      <button onClick={clearAll}>Clear All</button>

      <ul>
        {foods.map((entry) => (
          <li key={entry.id}>
            {entry.food}: {entry.calories} calories
            <button onClick={() => deleteFood(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalorieTracker;
